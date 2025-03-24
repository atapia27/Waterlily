'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSurveyStore } from '../store/surveyStore';
import SurveyForm from '../components/surveyForm';

const SurveyPage = () => {
  const params = useParams();
  const surveyId =  params?.id as string
  const { survey, setSurvey } = useSurveyStore();
  const router = useRouter();


  useEffect(() => {
    if (surveyId && (!survey || survey.id !== surveyId)) {
        setSurvey(surveyId)
    }
  }, [surveyId, survey, setSurvey])

  if (!survey) {
    return <div>Loading survey...</div>;
  }

  const handleReview = () => {
    router.push(`/survey/${surveyId}/review`);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">{survey.title}</h1>
      <SurveyForm />
      <button
        onClick={handleReview}
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Review Answers
      </button>
    </div>
  );
};

export default SurveyPage;
