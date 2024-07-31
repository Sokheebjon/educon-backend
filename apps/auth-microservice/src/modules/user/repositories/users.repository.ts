import { handleAsyncOperation } from '@edufin-back/common';
import { UserEntity } from '@edufin-back/shared/entities';
import { Prisma, UserPrismaService } from '@edufin-back/user-prisma-client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersRepository {
  constructor(private userPrismaService: UserPrismaService) {}

  //auth related
  async create(user: UserEntity) {
    let userRole = await handleAsyncOperation(
      this.userPrismaService.role.findUnique({
        where: { type: 'VERTUAL_USER' },
      })
    );
    if (user.roleId) {
      userRole = await handleAsyncOperation(
        this.userPrismaService.role.findUnique({
          where: { id: user?.roleId },
        })
      );
    }
    const data: Prisma.UserCreateInput = {
      firstName: user.firstName,
      lastName: user?.lastName,
      passwordHash: user?.passwordHash,
      phoneNumber: user?.phoneNumber,
      position: user?.position,
      dapartment: user?.department,
      photoId: user?.photoId,
      passport: user?.passport,
      role: {
        connect: { id: userRole.id },
      },
    };

    if (user.createdById) {
      data.createdBy = {
        connect: { id: user.createdById },
      };
    }

    return handleAsyncOperation(this.userPrismaService.user.create({
      data,
    }))
  }

  async findByPhoneNumber(phoneNumber: string) {
    return handleAsyncOperation( this.userPrismaService.user.findUnique({ where: { phoneNumber } }));
  }
  async findById(id: string) {
    return handleAsyncOperation(this.userPrismaService.user.findUnique({ where: { id } }));
  }
  async createVerification(code, phoneNumber, expiredAt) {
    return await handleAsyncOperation(
      this.userPrismaService.verification.create({
        data: {
          code,
          phoneNumber,
          expiredAt,
        },
      })
    );
  }

  async findOneVerification(id: string) {
    return await handleAsyncOperation(
      this.userPrismaService.verification.findUnique({
        where: {
          id,
        },
      })
    );
  }
  async deleteVerificationById(id: string) {
    return await handleAsyncOperation(
      this.userPrismaService.verification.delete({
        where: {
          id,
        },
      })
    );
  }

  //user related
  findAll() {
    return this.userPrismaService.user.findMany({
      where: {
        role: {
          type: { not: 'ADMIN' },
        },
      },
    });
  }
  async findOne(id: string) {
    const user = await handleAsyncOperation(
      this.userPrismaService.user.findUnique({
        select: {
          firstName: true,
          lastName: true,
          id: true,
          phoneNumber: true,
          role: true,
        },
        where: {
          id,
        },
      })
    );
    if (!user) {
      throw new RpcException(
        new BadRequestException({ message: 'Bunday foydalanuvchi topilmadi' })
      );
    }
    return user;
  }
  async getRoles() {
    return await handleAsyncOperation(this.userPrismaService.role.findMany({}));
  }
}
