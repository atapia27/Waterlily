'use client';

import { SurveyQuestion } from '@/types';
import ResponseField from '@/app/(features)/response/components/ResponseField';

interface Props {
  question: SurveyQuestion;
}

const SurveyQuestionCard = ({ question }: Props) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="font-semibold">{question.question.title}</h2>
      <p className="text-sm text-gray-600">{question.question.description}</p>
      <div className="mt-2">
        <ResponseField surveyQuestionId={question.id} type={question.question.questionType} />
      </div>
    </div>
  );
};

export default SurveyQuestionCard;
