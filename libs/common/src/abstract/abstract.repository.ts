import { BadRequestException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { handleAsyncOperation } from '../hoc';

abstract class AbstractRepository<
  ModelType = any,
  WhereArgsType = any,
  IncludeType = any,
  CreateType = any,
  UpdateType = any
> {
  constructor(protected repository: any) {}

  async findAll(
    where: WhereArgsType = undefined,
    include: IncludeType = undefined
  ): Promise<ModelType[]> {
    const results = await this.repository.findMany({ where, include });
    return results;
  }

  async create(data: CreateType): Promise<ModelType> {
    try {
      return await this.repository.create({ data });
    } catch (err) {
      throw new RpcException(new BadRequestException(err));
    }
  }

  async findOne(id: string, include: any = undefined): Promise<ModelType> {
    if (include) {
      include = JSON.parse(include);
    } else {
      include = undefined;
    }

    return await handleAsyncOperation(
      this.repository.findFirst({ where: { id }, include })
    );
  }

  async update(id, data: UpdateType): Promise<ModelType> {
    return await this.repository.update({ where: { id }, data });
  }

  async remove(id: string): Promise<ModelType> {
    const deletedRecord = await handleAsyncOperation<ModelType>(
      this.repository.delete({ where: { id } })
    );
    return deletedRecord;
  }

  async getResource(
    page: number,
    take: number,
    include?: string,
    where?: string
  ) {
    if (include) {
      include = JSON.parse(include);
    }
    if (where) {
      where = JSON.parse(where);
    }

    const skip = take * page;
    const dataCount = await this.repository.count({
      where,
    });

    const data = await this.repository.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
      include,
      where,
    });
    return {
      data,
      meta: {
        total: dataCount,
        page,
      },
    };
  }
}

export default AbstractRepository;
