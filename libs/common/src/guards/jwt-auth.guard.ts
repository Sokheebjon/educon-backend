import {
  CanActivate,
  ExecutionContext,
  Inject,
  OnModuleInit,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { IncomingMessage } from 'http';
import { ClientKafka } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';

class JwtAuthGuard implements CanActivate, OnModuleInit {
  constructor(
    private reflector: Reflector,
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka
  ) {}
  async onModuleInit() {
    await this.authClient.subscribeToResponseOf('authenticate');
    await this.authClient.connect();
  }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest<IncomingMessage>();
    const { headers } = req;
    const jwt = headers?.authorization?.split(' ')?.[1];
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send('authenticate', {
        Authorization: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true)
      );
  }
}
export default JwtAuthGuard;
