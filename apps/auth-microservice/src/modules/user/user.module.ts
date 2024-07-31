import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';
import { UserPrismaModule } from '@edufin-back/user-prisma-client';
import { UsersRepository } from './repositories/users.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentConnectorService } from '../../connector-services/student-connector.service';
import { GeneralSmsModule, PersonalInfoModule } from '@edufin-back/common/services';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'student',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-student-consumer',
          },
        },
      },
    ]),
    AuthModule,
    UserPrismaModule,
    GeneralSmsModule,
    PersonalInfoModule
  ],
  exports: [
    PersonalInfoModule,

    ClientsModule.register([
      {
        name: 'STUDENT_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'student',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-student-consumer',
          },
        },
      },
    ]),

    StudentConnectorService,
    GeneralSmsModule

  ],
  providers: [UserService, UsersRepository, StudentConnectorService],
})
export class UserModule {}
