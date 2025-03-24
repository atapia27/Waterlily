'use client';

import { SurveyQuestion } from '@/types';
import ResponseField from '@/app/(features)/response/components/ResponseField';

interface Props {
  question: SurveyQuestion;
}

const SurveyQuestionCard = ({ question }: Props) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-red-800">
          {question.question.title}
        </h2>
        <p className="text-sm text-gray-500">
          {question.question.description}
        </p>
      </div>

      <div className="mt-4">
        <ResponseField
          surveyQuestionId={question.id}
          type={question.question.questionType}
        />
      </div>
    </div>
  );
};

export default SurveyQuestionCard;
