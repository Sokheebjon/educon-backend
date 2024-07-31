import { CatalogPrismaService, Prisma } from '@edufin-back/catalog-prisma-client';
import { handleAsyncOperation } from '@edufin-back/common';
import { AbstractRepository } from '@edufin-back/common/abstract';
import {
  CreateEducationFormDto,
  FilterEducationFormDto,
  UpdateEducationFormDto,
} from '@edufin-back/shared/dto';
import { EducationFormEntity } from '@edufin-back/shared/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EducationFormService extends AbstractRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {
    super(catalogPrismaService.educationForm);
  }
  async create(
    createEducationFormDto: CreateEducationFormDto
  ): Promise<EducationFormEntity> {
    return await handleAsyncOperation(
      this.catalogPrismaService.educationForm.create({
        data: {
          nameEn: createEducationFormDto.nameEn,
          nameUz: createEducationFormDto.nameUz,
          nameRu: createEducationFormDto.nameRu,
          allowed_courses: createEducationFormDto?.allowed_courses,
          isExistInUniversity: createEducationFormDto?.isExistInUniversity,
          education_direction: {
            connect: createEducationFormDto?.education_directionIds?.map(
              (item) => {
                return { id: item };
              }
            ),
          },
          registration_purpose: {
            connect: createEducationFormDto?.registration_purposeIds?.map(
              (item) => {
                return { id: item };
              }
            ),
          },
        },
      })
    );
  }
  async update(id: string, updateEducationFormDto: UpdateEducationFormDto) {
    const currentEducationForm =
      await this.catalogPrismaService.educationForm.findUnique({
        where: { id },
        include: {
          education_direction: true,
          registration_purpose: true,
        },
      });
    const data: any = {
      nameEn: updateEducationFormDto.nameEn,
      nameUz: updateEducationFormDto.nameUz,
      nameRu: updateEducationFormDto.nameRu,
      allowed_courses: updateEducationFormDto?.allowed_courses,
      isExistInUniversity: updateEducationFormDto?.isExistInUniversity,
    };
    if (updateEducationFormDto?.education_directionIds?.length) {
      //edu Direction
      const currentEduDirectionIds = new Set(
        currentEducationForm.education_direction.map((ed) => ed.id)
      );
      const newEduDirectionIds =
        updateEducationFormDto.education_directionIds?.filter(
          (id) => !currentEduDirectionIds.has(id)
        );
      const eduDirectionIdsToDisconnect = Array.from(
        currentEduDirectionIds
      ).filter(
        (id) => !updateEducationFormDto.education_directionIds.includes(id)
      );
      data.education_direction = {
        connect: newEduDirectionIds.map((id) => ({ id })),
        disconnect: eduDirectionIdsToDisconnect.map((id) => ({ id })),
      };
    }
    if (updateEducationFormDto?.registration_purposeIds?.length) {
      //Registration prrpose
      const currentRegPurposeIds = new Set(
        currentEducationForm.registration_purpose.map((ed) => ed.id)
      );
      const newRegPurposeIds =
        updateEducationFormDto.registration_purposeIds.filter(
          (id) => !currentRegPurposeIds.has(id)
        );
      const regPurposeIdsToDisconnect = Array.from(currentRegPurposeIds).filter(
        (id) => !updateEducationFormDto.registration_purposeIds.includes(id)
      );
      data.registration_purpose = {
        connect: newRegPurposeIds.map((id) => ({ id })),
        disconnect: regPurposeIdsToDisconnect.map((id) => ({ id })),
      };
    }

    return await handleAsyncOperation(
      this.catalogPrismaService.educationForm.update({
        where: { id },
        data,
      })
    );
  }

  async getResource(page, take) {
    const skip = take * page;
    const dataCount = await this.catalogPrismaService.educationForm.count({});

    const data = await this.catalogPrismaService.educationForm.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        education_direction: true,
        registration_purpose: true,
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
  async findAll(filter: FilterEducationFormDto) {
    const whereArgs: Prisma.EducationFormWhereInput = {};
    if (filter.education_direction_id) {
      whereArgs.education_direction = {
        some: {
          id: filter?.education_direction_id,
        },
      };
    }
    if (filter.registration_purpose_id) {
      whereArgs.registration_purpose = {
        some: {
          id: filter?.registration_purpose_id,
        },
      };
    }
    if(filter.allowed_course){
      whereArgs.allowed_courses={
        has:+filter.allowed_course
      }
    }

    return await handleAsyncOperation(this.catalogPrismaService.educationForm.findMany({
      include: {
        education_direction: true,
      },
      where: whereArgs,
    }))
  }
}
