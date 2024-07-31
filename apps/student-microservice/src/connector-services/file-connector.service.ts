import { FileEntity } from '@edufin-back/shared/entities';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileConnectorService {
  constructor(
    @Inject('FILE_MICROSERVICE') private readonly fileClient: ClientKafka
  ) {}
  async getSingleFile(idOrPath: string): Promise<FileEntity> {
    const file = await this.fileClient.send('findOne_file-info', { idOrPath });
    return await firstValueFrom(file);
  }
}
