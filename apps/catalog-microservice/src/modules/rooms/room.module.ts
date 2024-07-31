import { Module } from '@nestjs/common';
import { CatalogPrismaModule } from '@edufin-back/catalog-prisma-client';
import { RoomService } from './services/room.service';
import { RoomRepository } from './repository/room.repository';
import { UserConnectorService } from '../../connector-services/user-connector-service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'test',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'catalog-auth-consumer',
          },
        },
      },
    ]),
    CatalogPrismaModule],
  providers: [RoomService, RoomRepository, UserConnectorService],
  exports: [RoomService],
})
export class RoomModule {}
