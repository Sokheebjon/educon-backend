// prisma/prisma-seed.ts

import { CatalogPrismaService } from '../catalog-prisma.service';

const prisma = new CatalogPrismaService();

async function main() {
  // Example: Seeding a role table
  const genders = await prisma.gender.createMany({
    data: [
      {
        id: 1,
        nameEn: 'Male',
        nameRu: 'Мужской',
        nameUz: 'Erkak',
      },
      {
        id: 2,
        nameEn: 'Female',
        nameRu: 'Женский',
        nameUz: 'Ayol',
      },
    ],
  });
  await prisma.registrationPurpose.createMany({
    data: [
      {
        type: 'PROSPECTIVE_STUDENT',
        nameUz: 'Abiturent',
        nameEn: 'Prospective Student',
        nameRu: 'Абитуриент',
      },
      {
        type: 'SECOND_SPECIALIZATION',
        nameUz: '2 – mutaxasislik',
        nameEn: 'Second Specialization',
        nameRu: 'Вторая специализация',
      },
      {
        type: 'STUDY_TRANSFER',
        nameUz: 'O’qishni ko’chirish',
        nameEn: 'Study Transfer',
        nameRu: 'Перевод обучения',
      },
      {
        type: 'MASTER_DEGREE',
        nameUz: 'Magistratura',
        nameEn: "Master's Degree",
        nameRu: 'Магистратура',
      },
    ],
  });
  //exam form list
  await prisma.examForm.createMany({
    data: [
      {
        nameEn: 'online',
        nameUz: 'onlayn',
        nameRu: 'онлайн',
        type:"ONLINE",
        id: 0,
      },
      {
        nameEn: 'offline',
        nameUz: 'oflayn',
        nameRu: 'офлайн',
        id: 1,
      },
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
