import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileService implements OnModuleInit {
  constructor(
    @Inject('FILE_MICROSERVICE') private readonly fileClient: ClientKafka
  ) {}
  async onModuleInit() {
    this.fileClient.subscribeToResponseOf('create_file');
    this.fileClient.subscribeToResponseOf('findOne_file');
    this.fileClient.subscribeToResponseOf('delete_file');
    this.fileClient.subscribeToResponseOf('findOne_file-info');
    await this.fileClient.connect();
  }

  async create(file) {
    return await this.fileClient.send('create_file', JSON.stringify({ file }));
  }

  async findOne(idOrPath: string, res) {
    const fileResponce = await this.fileClient
      .send('findOne_file', JSON.stringify({ idOrPath }))
      .pipe();
    const responce: { file: string } = await firstValueFrom(fileResponce);
    return res.sendFile(responce?.file);
  }
  async findOneWithInfo(idOrPath: string) {
    return await this.fileClient.send(
      'findOne_file-info',
      JSON.stringify({ idOrPath })
    );
  }
  async delete(idOrPath: string) {
    return await this.fileClient.send(
      'delete_file',
      JSON.stringify({ idOrPath })
    );
  }
}
