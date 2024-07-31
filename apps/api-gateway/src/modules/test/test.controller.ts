import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TestService } from './test.service';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import {  ApiTags } from '@nestjs/swagger';
import {  CreateTestDto, GetResourceTestDto, UpdateTestDto } from '@edufin-back/shared/dto';
@ApiTags('Test')
@Controller()
export class TestController {
  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly testService: TestService
  ) {}
  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }
  @Get('get-resource')
  async getResource(@Query() getResourceTestDto : GetResourceTestDto) {
    return this.testService.getResource(+getResourceTestDto?.page, +getResourceTestDto?.take);
  }

  @Get(":id")
  async findOne(@Param('id') id: string) {
    return this.testService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(id,updateTestDto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.testService.deleteOne(id);
  }
}
