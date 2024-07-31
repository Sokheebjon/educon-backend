import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule as NestJsRouterModule } from '@nestjs/core';
import { RoutesAuthModule } from './routes/routes.auth.module';
import { AppController } from '../app/app.controller';

import { RoutesCatalogModule } from './routes/routes.catalog.module ';
import { RoutesTestModule } from './routes/routes.test.module';
import { RoutesFileModule } from './routes/routes.file.module';
import { RoutesSmsModule } from './routes/routes.sms.module';
import { RoutesUserModule } from './routes/routes.user.module';
import { RoutesStudentModule } from './routes/routes.student.module ';
import { RoutesRoleModule } from './routes/routes.role.module';

@Module({})
export class RouterModule {
  static forRoot(): DynamicModule {
    const imports: (
      | DynamicModule
      | Type
      | Promise<DynamicModule>
      | ForwardReference
    )[] = [];

    if (process.env.HTTP_ENABLE === 'true') {
      imports.push(
        RoutesAuthModule,
        RoutesCatalogModule,
        RoutesTestModule,
        RoutesFileModule,
        RoutesSmsModule,
        RoutesUserModule,
        RoutesStudentModule,
        RoutesRoleModule,
        NestJsRouterModule.register([
          {
            path: '/auth',
            module: RoutesAuthModule,
          },
          {
            path: '/catalog',
            module: RoutesCatalogModule,
          },
          {
            path: '/test',
            module: RoutesTestModule,
          },
          {
            path: '/file',
            module: RoutesFileModule,
          },
          {
            path: '/sms',
            module: RoutesSmsModule,
          },
          {
            path: '/user',
            module: RoutesUserModule,
          },
          {
            path: '/student',
            module: RoutesStudentModule,
          },
          {
            path: '/role',
            module: RoutesRoleModule,
          },
        ])
      );
    }

    return {
      module: RouterModule,
      providers: [],
      exports: [],
      controllers: [AppController],
      imports,
    };
  }
}
