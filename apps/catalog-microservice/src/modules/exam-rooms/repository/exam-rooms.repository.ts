import {
  CatalogPrismaService,
  Prisma,
} from '@edufin-back/catalog-prisma-client';
import {
  CreateExamRoomsDto,
  UpdateExamRoomsDto,
} from '@edufin-back/shared/dto';
import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class ExamRoomsRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {}
  async findMany() {
    return await this.catalogPrismaService.examRooms.findMany({
      include: {
        education_direction: true,
        exam_times: true,
        room: true,
      },
    });
  }
  async create(createExamRoomsDto: CreateExamRoomsDto) {
    const {
      exam_date,
      education_direction_id,
      exam_times,
      room_capacity,
      room_id,
    } = createExamRoomsDto;
    return await this.catalogPrismaService.examRooms.create({
      data: {
        exam_date: exam_date,
        exam_date_formatted: moment(exam_date).format('DD.MM.YYYY'),
        room_capacity,
        exam_times: {
          create: exam_times.map((t) => {
            return {
              time: t?.time,
            };
          }),
        },
        room: {
          connect: {
            id: room_id,
          },
        },
        education_direction: {
          connect: {
            id: education_direction_id,
          },
        },
      },
    });
  }
  async findOne(id: string) {
    return await this.catalogPrismaService.examRooms.findUnique({
      where: {
        id,
      },
      include: {
        education_direction: true,
        exam_times: true,
        room: true,
      },
    });
  }
  async update(id: string, updateExamRoomsDto: UpdateExamRoomsDto) {
    const dtoWithoutExamTimes = Object.keys(updateExamRoomsDto).reduce(
      (acc, key) => {
        if (key !== 'exam_times') {
          acc[key] = updateExamRoomsDto[key];
        }
        return acc;
      },
      {}
    );

    const payload: Prisma.ExamRoomsUpdateInput = { ...dtoWithoutExamTimes };
    if (updateExamRoomsDto?.exam_times) {
      payload.exam_times = {
        updateMany: updateExamRoomsDto?.exam_times?.map((t) => {
          return {
            where: {
              id: t?.id,
            },
            data: {
              time: t?.time,
            },
          };
        }),
      };
    }
    return await this.catalogPrismaService.examRooms.update({
      where: {
        id,
      },
      data: payload,
    });
  }
  async remove(id: string) {
    return await this.catalogPrismaService.examRooms.delete({
      where: { id },
    });
  }
  async getResource(page: number, take: number) {
    const skip = take * page;
    const dataCount = await this.catalogPrismaService.examRooms.count({});
    const data = await this.catalogPrismaService.examRooms.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
      include: {
        education_direction: true,
        exam_times: true,
        room: true,
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
