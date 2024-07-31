import { handleAsyncOperation } from '@edufin-back/common';
import { GeneralSmsService } from '@edufin-back/common/services';
import { GeneralPrismaService } from '@edufin-back/general-prisma-client';
import { CreateSmsDto } from '@edufin-back/shared/dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class SmsService {
  constructor(
    private readonly generalPrismaService: GeneralPrismaService,
    private readonly generalSmsService: GeneralSmsService
  ) {}
  async createBatchSms(createSmsDto: CreateSmsDto) {
    console.log(createSmsDto,11)
    const message = await this.generalPrismaService.sms.create({
      data: {
        message: createSmsDto?.message,
        receivers_count: createSmsDto?.phone_numbers?.length,
      },
    });
    const messages = createSmsDto?.phone_numbers?.map(async (phone: string) => {
      const sms = await handleAsyncOperation(this.generalSmsService.sendSms(
        phone,
        createSmsDto?.message
      ))
      if (sms?.success) {
        return await this.generalPrismaService.smsReceivers.create({
          data: {
            phoneNumber: phone,
            status: 'WAITING',
            message_id: sms?.message_id,
            sms: {
              connect: {
                id: message.id,
              },
            },
          },
        });
      }
    });

    await Promise.all(messages).then((data) => {
      return data;
    });
  }
  async getResource(page, take) {
    const skip = +take * +page;
    const dataCount = await this.generalPrismaService.sms.count({});
    const data = await this.generalPrismaService.sms.findMany({
      skip,
      take,
      include: {
        receivers: {
          select: {
            phoneNumber: true,
            status: true,
          },
        },
      },
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
