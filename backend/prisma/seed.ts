import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.upsert({
    where: { name: 'Alice' },
    update: {},
    create: {
      name: 'Alice',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { name: 'Bob' },
    update: {},
    create: {
      name: 'Bob',
    },
  });

  // Create Survey
  const survey = await prisma.survey.upsert({
    where: { title: 'Customer Satisfaction Survey' },
    update: {},
    create: {
      title: 'Customer Satisfaction Survey',
    },
  });

  // Create Questions
  const questions = await Promise.all([
    prisma.question.upsert({
      where: {
        title_description: {
          title: 'How satisfied are you with our service?',
          description: 'Rate from 1 to 10.',
        },
      },
      update: {},
      create: {
        title: 'How satisfied are you with our service?',
        description: 'Rate from 1 to 10.',
        questionType: 'NUMERIC',
      },
    }),
    prisma.question.upsert({
      where: {
        title_description: {
          title: 'What did you like about our service?',
          description: 'Open-ended response.',
        },
      },
      update: {},
      create: {
        title: 'What did you like about our service?',
        description: 'Open-ended response.',
        questionType: 'TEXT',
      },
    }),
    prisma.question.upsert({
      where: {
        title_description: {
          title: 'What can we improve?',
          description: 'Be honest.',
        },
      },
      update: {},
      create: {
        title: 'What can we improve?',
        description: 'Be honest.',
        questionType: 'TEXT',
      },
    }),
  ]);

  // Create SurveyQuestions (linking each question to the survey)
  await Promise.all(
    questions.map((question) =>
      prisma.surveyQuestion.upsert({
        where: {
          surveyId_questionId: {
            surveyId: survey.id,
            questionId: question.id,
          },
        },
        update: {},
        create: {
          surveyId: survey.id,
          questionId: question.id,
        },
      })
    )
  );

  console.log('✅ Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
