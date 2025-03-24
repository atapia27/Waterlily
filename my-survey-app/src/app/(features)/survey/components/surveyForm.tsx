'use client';

import { useSurveyStore } from '../store/surveyStore';
import SurveyQuestionCard from '../../question/components/surveyQuestionCard';

const SurveyForm = () => {
  const { surveyQuestions } = useSurveyStore();

  return (
    <div className="space-y-6">
      {surveyQuestions.map((q) => (
        <SurveyQuestionCard key={q.id} question={q} />
      ))}
    </div>
  );
};

export default SurveyForm;
