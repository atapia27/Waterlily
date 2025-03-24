export type QuestionType = "TEXT" | "NUMERIC";

export type Question = {
  id: string;
  title: string;
  description: string;
  questionType: QuestionType;
};

export type SurveyQuestion = {
  id: string;
  surveyId: string;
  questionId: string;
  question: Question;
};

export type Survey = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type ResponseEntry = {
  id: string;
  userId: string;
  surveyQuestionId: string;
  answer: string;
};
