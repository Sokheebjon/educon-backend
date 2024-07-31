import { CatalogPrismaService } from '@edufin-back/catalog-prisma-client';
import { handleAsyncOperation } from '@edufin-back/common';
import { AbstractRepository } from '@edufin-back/common/abstract';
import {
  CreateEducationLanguageDto,
  FilterEducationLanguageDto,
  UpdateEducationLanguageDto,
} from '@edufin-back/shared/dto';
import { EducationLanguageEntity } from '@edufin-back/shared/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EducationLanguageService extends AbstractRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {
    super(catalogPrismaService.educationLanguage);
  }
  async create(
    createEducationLanguageDto: CreateEducationLanguageDto
  ): Promise<EducationLanguageEntity> {
    return await handleAsyncOperation(
      this.catalogPrismaService.educationLanguage.create({
        data: {
          nameEn: createEducationLanguageDto.nameEn,
          nameUz: createEducationLanguageDto.nameUz,
          nameRu: createEducationLanguageDto.nameRu,
          education_direction: {
            connect: createEducationLanguageDto?.education_directionIds?.map(
              (item) => {
                return { id: item };
              }
            ),
          },
        },
      })
    );
  }
  async update(id: string, updateEducationLanguageDto: UpdateEducationLanguageDto) {
    const currentEducationLanguage = await this.catalogPrismaService.educationLanguage.findUnique({
      where: { id },
      include: {
        education_direction: true, 
      },
    });
  
    const currentIds = new Set(currentEducationLanguage.education_direction.map(ed => ed.id));
  
    const newIdsToConnect = updateEducationLanguageDto.education_directionIds.filter(id => !currentIds.has(id));
  
    const idsToDisconnect = Array.from(currentIds).filter(id => !updateEducationLanguageDto.education_directionIds.includes(id));
  
    return await this.catalogPrismaService.educationLanguage.update({
      where: { id },
      data: {
        nameEn: updateEducationLanguageDto.nameEn,
        nameUz: updateEducationLanguageDto.nameUz,
        nameRu: updateEducationLanguageDto.nameRu,
        education_direction: {
          connect: newIdsToConnect.map(id => ({ id })),
          disconnect: idsToDisconnect.map(id => ({ id })),
        },
      },
    });
  }
  
  async getResource(page, take) {
    const skip = take * page;
    const dataCount = await this.catalogPrismaService.educationLanguage.count(
      {}
    );

    const data = await this.catalogPrismaService.educationLanguage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        education_direction: true,
      },
      skip,
      take,
    });
    return {
      data,
      meta: {
        total: dataCount,
        page,
      },
    };
  }
  async findAll(filter: FilterEducationLanguageDto) {
    const whereArgs:any = {};
    if (filter.education_direction_id) {
      whereArgs.education_direction = {
        some: {
          id: filter?.education_direction_id,
        },
      };
    }

    return await this.catalogPrismaService.educationLanguage.findMany({
      include: {
        education_direction: true,
      },
      where: whereArgs,
    });
  }
}
