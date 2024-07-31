import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './prisma/generated/prisma-client-js';
import prismaRandom from 'prisma-extension-random';

@Injectable()
export class TestPrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query'],
    });
  }

  async onModuleInit() {
    await this.$extends(prismaRandom())
    await this.$connect();
  
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log(`${e.query} ${e.params}`);
    });
  }
}
