import { CatalogPrismaService } from '@edufin-back/catalog-prisma-client';
import { CreateRoomDto, UpdateRoomDto } from '@edufin-back/shared/dto';
import { Injectable } from '@nestjs/common';
import { UserConnectorService } from '../../../connector-services/user-connector-service';

@Injectable()
export class RoomRepository {
  constructor(
    private readonly userConnectorService: UserConnectorService,
    private readonly catalogPrismaService: CatalogPrismaService
  ) {}
  async findMany() {
    return await this.catalogPrismaService.rooms.findMany({});
  }
  async create(createRoomDto: CreateRoomDto) {
    return await this.catalogPrismaService.rooms.create({
      data: createRoomDto,
    });
  }
  async findOne(id: string) {
    const room = await this.catalogPrismaService.rooms.findUnique({
      where: { id },
    });
    const responsible_person = await this.userConnectorService.getUserById(
      room.responsible_person_id
    );
    return { ...room, responsible_person };
  }
  async update(id: string, updateRoomDto: UpdateRoomDto) {
    return await this.catalogPrismaService.rooms.update({
      where: {
        id,
      },
      data: updateRoomDto,
    });
  }
  async remove(id: string) {
    return await this.catalogPrismaService.rooms.delete({
      where: { id },
    });
  }
  async getResource(page: number, take: number) {
    const skip = take * page;
    const dataCount = await this.catalogPrismaService.rooms.count({});
    const rawData = await this.catalogPrismaService.rooms.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
    const rawDataPromise = rawData?.map(async (room) => {
      const responsible_person = await this.userConnectorService.getUserById(
        room.responsible_person_id
      );
      return { ...room, responsible_person };
    });
    const data = await Promise.all(rawDataPromise);
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
