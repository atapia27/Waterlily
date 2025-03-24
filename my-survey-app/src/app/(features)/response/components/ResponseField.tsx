'use client';

import { useSurveyStore } from '@/app/(features)/survey/store/surveyStore';

interface Props {
  surveyQuestionId: string;
  type: 'TEXT' | 'NUMERIC';
}

const ResponseField = ({ surveyQuestionId, type }: Props) => {
  const { responses, updateResponse } = useSurveyStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateResponse(surveyQuestionId, e.target.value);
  };

  // if Numeric? then value (number input field)
  return (
    <input
      type={type === 'NUMERIC' ? 'number' : 'text'}
      value={responses[surveyQuestionId] || ''}
      onChange={handleChange}
      className="w-full mt-1 p-2 border rounded"
      placeholder={type === 'NUMERIC' ? 'Enter a number' : 'Enter your answer'}
    />
  );
};

export default ResponseField;
