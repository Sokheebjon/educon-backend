import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new RpcException(
        new UnauthorizedException({
          message: 'Invalid Token!',
        })
      );
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
