import {
  CreateRegistrationDto,
  GetRegistartionListByFilterDto,
  UpdateRegistrationDto,
  UpdateRegistrationStatusDto,
} from '@edufin-back/shared/dto';
import { StudentPrismaService } from '@edufin-back/student-prisma-client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CatalogConnectorService } from '../../../connector-services/catalog-connector.service';
import { handleAsyncOperation } from '@edufin-back/common';
import { RpcException } from '@nestjs/microservices';
import { RegistrationEntity } from 'libs/shared/src/entities/registration.entity';
import { FileConnectorService } from 'apps/student-microservice/src/connector-services/file-connector.service';

@Injectable()
export class ExamRepository {
  constructor(
   
  ) {}

 
}
