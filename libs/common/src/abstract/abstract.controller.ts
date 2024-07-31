// eslint-disable-next-line max-classes-per-file
import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import {
  GetResourceDto,
  GetSingleDto,
  Paginate,
} from '@edufin-back/shared/dto';
import type { AbstractControllerOptions } from './interfaces/abstract-controller-options.interface';
import { Public } from '../decorators';

function buildController<T, C, V>(
  options: AbstractControllerOptions<T, C, V>
): any {
  const { createDto, model, name, updateDto } = options;

  @ApiTags(name)
  @ApiExtraModels(Paginate, model)
  abstract class AbstractController<CreateDto = any, UpdateDto = any> {
    constructor(private readonly service: any) {}
    @Get()
    @ApiOkResponse({ type: model, isArray: true })
    findAll(): Promise<T[]> {
      return this.service.findAll();
    }

    @ApiBody({
      type: createDto,
      description: 'Data for model creation',
      required: true,
      isArray: false,
    })
    @ApiOkResponse({ type: model })
    @Post()
    create(@Body() createDto: CreateDto) {
      return this.service.create(createDto);
    }

    @Get('/get-resource')
    @ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(Paginate) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
    async getResource(
      @Query()
      { page = '0', take = '10', include, where }: GetResourceDto
    ) {
      return this.service.getResource(+page, +take, include, where);
    }

    @Get(':id')
    @ApiOkResponse({ type: model })
    findOne(@Param('id') id: string, @Query() { include }: GetSingleDto) {
      return this.service.findOne(id, include);
    }

    @Patch(':id')
    @ApiOkResponse({ type: model })
    @ApiBody({
      type: updateDto,
      description: 'Data for model creation',
      required: true,
      isArray: false,
    })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateDto) {
      return this.service.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: model })
    remove(@Param('id') id: string) {
      return this.service.remove( id );
    }
  }

  return AbstractController;
}
export default buildController;
