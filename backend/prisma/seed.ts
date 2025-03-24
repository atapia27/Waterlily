import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.upsert({
    where: { name: 'Alice' },
    update: {},
    create: { name: 'Alice' },
  });

  const user2 = await prisma.user.upsert({
    where: { name: 'Bob' },
    update: {},
    create: { name: 'Bob' },
  });

  // Create Surveys
  const surveys = await Promise.all([
    prisma.survey.upsert({
      where: { title: 'Customer Satisfaction Survey' },
      update: {},
      create: { title: 'Customer Satisfaction Survey' },
    }),
    prisma.survey.upsert({
      where: { title: 'Employee Engagement Survey' },
      update: {},
      create: { title: 'Employee Engagement Survey' },
    }),
    prisma.survey.upsert({
      where: { title: 'Product Feedback Survey' },
      update: {},
      create: { title: 'Product Feedback Survey' },
    }),
    prisma.survey.upsert({
      where: { title: 'Event Feedback Survey' },
      update: {},
      create: { title: 'Event Feedback Survey' },
    }),
  ]);

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
    prisma.question.upsert({
      where: {
        title_description: {
          title: 'Do you feel valued at work?',
          description: 'Open-ended response.',
        },
      },
      update: {},
      create: {
        title: 'Do you feel valued at work?',
        description: 'Open-ended response.',
        questionType: 'TEXT',
      },
    }),
    prisma.question.upsert({
      where: {
        title_description: {
          title: 'How likely are you to recommend this product?',
          description: 'Rate from 1 to 10.',
        },
      },
      update: {},
      create: {
        title: 'How likely are you to recommend this product?',
        description: 'Rate from 1 to 10.',
        questionType: 'NUMERIC',
      },
    }),
    prisma.question.upsert({
      where: {
        title_description: {
          title: 'What did you think about the event location?',
          description: 'Venue quality, accessibility, etc.',
        },
      },
      update: {},
      create: {
        title: 'What did you think about the event location?',
        description: 'Venue quality, accessibility, etc.',
        questionType: 'TEXT',
      },
    }),
    prisma.question.upsert({
      where: {
        title_description: {
          title: 'What was your favorite part of the event?',
          description: 'Be descriptive!',
        },
      },
      update: {},
      create: {
        title: 'What was your favorite part of the event?',
        description: 'Be descriptive!',
        questionType: 'TEXT',
      },
    }),
  ]);

  // Link questions to surveys
  const linkSurveyQuestions = [
    // Customer Satisfaction Survey
    {
      survey: surveys[0],
      questionTitles: [
        'How satisfied are you with our service?',
        'What did you like about our service?',
        'What can we improve?',
      ],
    },
    // Employee Engagement Survey
    {
      survey: surveys[1],
      questionTitles: [
        'Do you feel valued at work?',
        'What can we improve?',
      ],
    },
    // Product Feedback Survey
    {
      survey: surveys[2],
      questionTitles: [
        'How likely are you to recommend this product?',
        'What did you like about our service?',
        'What can we improve?',
      ],
    },
    // Event Feedback Survey
    {
      survey: surveys[3],
      questionTitles: [
        'What did you think about the event location?',
        'What was your favorite part of the event?',
      ],
    },
  ];

  for (const { survey, questionTitles } of linkSurveyQuestions) {
    const matchedQuestions = questions.filter((q) =>
      questionTitles.includes(q.title)
    );

    await Promise.all(
      matchedQuestions.map((question) =>
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
  }

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
