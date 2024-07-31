import {  CreateTestDto, UpdateTestDto } from '@edufin-back/shared/dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TestService implements OnModuleInit {
  constructor(
    @Inject('TEST_MICROSERVICE') private readonly testClient: ClientKafka
  ) {}
  async onModuleInit() {
    await this.testClient.subscribeToResponseOf('create_test');
    await this.testClient.subscribeToResponseOf('update_test');
    await this.testClient.subscribeToResponseOf('findOne_test');
    await this.testClient.subscribeToResponseOf('getResource_test');
    await this.testClient.subscribeToResponseOf('deleteOne_test');

    await this.testClient.connect();
  }

  async create(createTestDto: CreateTestDto) {
    return await this.testClient.send(
      'create_test',
      JSON.stringify(createTestDto)
    );
  }
  async update(id: string, updateTestDto: UpdateTestDto) {
    return await this.testClient.send(
      'update_test',
      JSON.stringify({ id, updateTestDto })
    );
  }
  async findOne(id: string) {
    return await this.testClient.send('findOne_test', JSON.stringify({ id }));
  }
  async deleteOne(id: string) {
    return await this.testClient.send('deleteOne_test', JSON.stringify({ id }));
  }
  async getResource(page, take) {
    return await this.testClient.send(
      'getResource_test',
      JSON.stringify({ page, take })
    );
  }

}
