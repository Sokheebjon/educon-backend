import { CatalogPrismaService } from '@edufin-back/catalog-prisma-client';
import { handleAsyncOperation } from '@edufin-back/common';
import { AbstractRepository } from '@edufin-back/common/abstract';
import {
  CreateAgreementPriceDto,
  UpdateAgreementPriceDto,
} from '@edufin-back/shared/dto';
import { AgreementPriceEntity } from '@edufin-back/shared/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AgreementPriceService extends AbstractRepository {
  constructor(private readonly catalogPrismaService: CatalogPrismaService) {
    super(catalogPrismaService.agreementPrice);
  }
  async create(
    createAgreementPriceDto: CreateAgreementPriceDto
  ): Promise<AgreementPriceEntity> {
    return await handleAsyncOperation(
      this.catalogPrismaService.agreementPrice.create({
        data: {
          education_direction_id:
            createAgreementPriceDto.education_direction_id,
          education_form_id: createAgreementPriceDto?.education_form_id,
          agreement_price_limits: {
            createMany: {
              data: createAgreementPriceDto?.agreement_price_limits?.map(
                (item) => {
                  return {
                    from_score: item?.from_score,
                    price: item?.price,
                    to_score: item?.to_score,
                    price_in_text: item?.price_in_text,
                  };
                }
              ),
            },
          },
        },
      })
    );
  }
  async update(id: string, updateAgreementPriceDto: UpdateAgreementPriceDto) {
    const currentLimits =
      await this.catalogPrismaService.agreementPriceLimits?.findMany({
        where: {
          agreement_price_id: id,
        },
      });
    const updates = updateAgreementPriceDto.agreement_price_limits.filter(
      (limit) => limit.id
    );
    const creations = updateAgreementPriceDto.agreement_price_limits.filter(
      (limit) => !limit.id
    );

    return await handleAsyncOperation(
      this.catalogPrismaService.agreementPrice.update({
        where: {
          id,
        },
        data: {
          education_direction_id:
            updateAgreementPriceDto.education_direction_id,
          education_form_id: updateAgreementPriceDto?.education_form_id,
          agreement_price_limits: {
            updateMany: updates?.map((item) => {
              return {
                where: {
                  id: item?.id,
                },
                data: {
                  from_score: item?.from_score,
                  to_score: item?.to_score,
                  price: item?.price,
                  price_in_text: item?.price_in_text,
                },
              };
            }),
            createMany: {
              data: creations.map((item) => {
                return {
                  from_score: item?.from_score,
                  to_score: item?.to_score,
                  price: item?.price,
                  price_in_text: item?.price_in_text,
                };
              }),
            },
            deleteMany: currentLimits
              .filter(
                (cl) =>
                  !updateAgreementPriceDto.agreement_price_limits.some(
                    (ul) => ul.id === cl.id
                  )
              )
              .map((cl) => ({ id: cl.id })),
          },
        },
      })
    );
  }
  async findAll() {
    return await handleAsyncOperation(
      this.catalogPrismaService.agreementPrice.findMany({
        include: {
          education_direction: true,
        },
        where: {},
      })
    );
  }
  async getOneByScoreMatch(score, education_direction_id, education_form_id) {
    const agreementPrices = await handleAsyncOperation(
      this.catalogPrismaService.agreementPrice.findFirst({
        where: {
          education_direction_id,
          education_form_id
        },
        include: {
          agreement_price_limits: {
            where: {
              AND: [
                {
                  from_score: { lte: +score },
                  to_score: { gte: +score },
                },
              ],
            },
          },
        },
      })
    );

    let matchedAgreementPriceLimit = null;
    if (agreementPrices && agreementPrices.agreement_price_limits.length > 0) {
      matchedAgreementPriceLimit = agreementPrices.agreement_price_limits[0];
    }

    return matchedAgreementPriceLimit;
  }
}
