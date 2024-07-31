import {
  CatalogPrismaService,
  Prisma,
} from '@edufin-back/catalog-prisma-client';
import { handleAsyncOperation } from '@edufin-back/common';
import {
  CreateEducationDirectionDto,
  FilterEducationDirectionDto,
  UpdateEducationDirectionDto,
} from '@edufin-back/shared/dto';
import {  Injectable } from '@nestjs/common';


@Injectable()
export class EducationDirectionRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {}
  async findMany(filter: FilterEducationDirectionDto) {
    const whereArgs: Prisma.EducationDirectionWhereInput = {};
    if (filter?.academic_degree_id) {
      whereArgs.academic_degree_id = filter.academic_degree_id;
    }
    if (filter?.registration_purpose_id) {
      whereArgs.registration_purpose = {
        some: {
          id: filter.registration_purpose_id,
        },
      };
    }
    if(filter.allowed_course){
      whereArgs.allowed_courses={
        has:+filter.allowed_course
      }
    }
    return await handleAsyncOperation(this.catalogPrismaService.educationDirection.findMany({
      where: whereArgs,
      include: {
        registration_purpose: true,
        academic_degree: true,
        academic_blocks: {
          include: {
            subject: true,
          },
        },
      },
    }))
  }
  async create(createEducationDirectionDto: CreateEducationDirectionDto) {
    const {
      code,
      nameEn,
      nameUz,
      nameRu,
      short_title,
      academic_degree_id,
      academic_blocks,
      duration,
      registration_purpose_ids,
      allowed_courses
    } = createEducationDirectionDto;

    return await this.catalogPrismaService.educationDirection.create({
      data: {
        code: code,
        nameEn: nameEn,
        nameUz: nameUz,
        nameRu: nameRu,
        short_title: short_title,
        allowed_courses,
        registration_purpose: {
          connect: registration_purpose_ids?.map((id) => ({ id })),
        },
        academic_degree: {
          connect: {
            id: academic_degree_id,
          },
        },
        academic_blocks: {
          create: academic_blocks,
        },
        duration: {
          create: duration,
        },
      },
      include: {
        academic_blocks: true,
      },
    });
  }
  async findOne(id: string, education_form_id?: string) {
    const singleDirection= await this.catalogPrismaService.educationDirection.findUnique({
      where: { id},
      include: {
        registration_purpose: true,
        academic_degree: true,
        duration: {
          include: {
            education_form: {
              select: {
                nameUz: true,
              },
            },
          },
        },
        academic_blocks: {
          include: {
            subject: true,
          },
        },
      },
    });
    if(!singleDirection){
      return null
    }
    if(education_form_id){
      singleDirection.duration=singleDirection?.duration?.filter((item)=>item?.education_form_id===education_form_id)
    }
    return singleDirection
  }
  async update(
    id: string,
    updateEducationDirectionDto: UpdateEducationDirectionDto
  ) {
    const {
      nameEn,
      nameRu,
      nameUz,
      code,
      short_title,
      academic_degree_id,
      academic_blocks,
      duration,
      registration_purpose_ids,
      allowed_courses
    } = updateEducationDirectionDto;

    const currentDirection =
      await this.catalogPrismaService.educationDirection.findUnique({
        where: { id },
        select: {
          academic_blocks: true,
          registration_purpose: true,
          duration: true,
        },
      });

    //direction duractions
    const currentDuractionIds =
      currentDirection?.duration?.map((duration) => duration.id) || [];
    const newDirectionIds = duration?.map((duration) => duration.id) || [];

    const durationsToDelete = currentDuractionIds?.filter(
      (id) => !newDirectionIds?.includes(id)
    );
    //academic blocks
    const currentBlockIds =
      currentDirection?.academic_blocks?.map((block) => block.id) || [];
    const newBlockIds = academic_blocks?.map((block) => block.id) || [];

    const blocksToDelete = currentBlockIds?.filter(
      (id) => !newBlockIds?.includes(id)
    );

    //registration purposes
    const currentPurposeIds =
      currentDirection?.registration_purpose?.map((purpose) => purpose?.id) ||
      [];

    const purposesToDisconnect = currentPurposeIds?.filter(
      (id) => !registration_purpose_ids?.includes(id)
    );
    const purposesToConnect = registration_purpose_ids?.filter(
      (id) => !currentPurposeIds?.includes(id)
    );

    // Initialize the data object
    const data: Prisma.EducationDirectionUncheckedUpdateInput = {
      nameUz,
      nameEn,
      nameRu,
      code,
      short_title,
      allowed_courses
    };
    if (academic_blocks?.length) {
      data.academic_blocks = {
        upsert: academic_blocks.map((ab) => ({
          where: { id: ab?.id || 'undefined' },
          update: {
            id: ab?.id,
            score: ab?.score,
            subject: {
              connect: {
                id: ab?.subject_id,
              },
            },
            tests_count: ab?.tests_count,
            test_duration: ab?.test_duration,
          },
          create: {
            score: ab?.score,
            subject: {
              connect: {
                id: ab?.subject_id,
              },
            },
            tests_count: ab?.tests_count,
            test_duration: ab?.test_duration,
          },
        })),
        delete: blocksToDelete?.map((id) => ({ id })),
      };
    }
    if (duration?.length) {
      data.duration = {
        upsert: duration.map((d) => ({
          where: { id: d?.id || 'undefined' },
          update: {
            id: d?.id,
            education_form_id: d?.education_form_id,
            duration: d?.duration,
            duration_text: d?.duration_text,
          },
          create: {
            education_form_id: d?.education_form_id,
            duration: d?.duration,
            duration_text: d?.duration_text,
          },
        })),
        delete: durationsToDelete?.map((id) => ({ id })),
      };
    }

    if (registration_purpose_ids?.length) {
      data.registration_purpose = {
        connect: purposesToConnect.map((id) => ({ id })),
        disconnect: purposesToDisconnect.map((id) => ({ id })),
      };
    }
    if (academic_degree_id) {
      data.academic_degree_id = {
        set: academic_degree_id,
      };
    }
    

    return await handleAsyncOperation(
      this.catalogPrismaService.educationDirection.update({
        where: { id },
        data,
      })
    );
  }

  async remove(id: string) {
    return await this.catalogPrismaService.educationDirection.delete({
      where: { id },
    });
  }
  async getResource(page: number, take: number) {
    const skip = take * page;
    const dataCount = await this.catalogPrismaService.educationDirection.count(
      {}
    );
    const data = await this.catalogPrismaService.educationDirection.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
      include: {
        registration_purpose: true,
        academic_degree: true,
        academic_blocks: {
          include: {
            subject: true,
          },
        },
      },
    });
    return {
      data,
      meta: {
        total: dataCount,
        page,
        last_page: Math.ceil(dataCount / take),
      },
    };
  }
}
