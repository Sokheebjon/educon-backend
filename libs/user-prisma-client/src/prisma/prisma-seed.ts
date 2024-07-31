// prisma/prisma-seed.ts

import { UserPrismaService } from '../user-prisma.service';

const prisma = new UserPrismaService();

async function main() {
  // Example: Seeding a role table
  const role = await prisma.role.createMany({
    data: [
      // {
      //   name: 'Admin',
      //   description: 'Admin',
      //   type: 'ADMIN',
      // },
      // {
      //   name: 'Vertual User',
      //   description: 'Vertual user',
      //   type: 'VERTUAL_USER',
      // },
      // {
      //   name: 'Moderator',
      //   description: "hujjat tekshirish bilan shug'ullanadi",
      //   type: 'DOC_CONFIRMER',
      // },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
