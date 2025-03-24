'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSurveyStore } from '../../store/surveyStore';
import { USERS } from '@/constants/users'

const ReviewPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { survey, surveyQuestions, responses, submitResponses } = useSurveyStore();

  const userId = USERS[0].id; // Alice

  useEffect(() => {
    if (!survey || survey.id !== id) {
      // Fallback if someone refreshes this page without going through the flow
      alert('Please start from the survey page.');
      router.push('/survey');
    }
  }, [id, survey, router]);

  const handleSubmit = async () => {
    if (typeof id !== 'string') return;
    await submitResponses(id, userId);
    router.push('/survey');
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Review Your Responses</h1>

      {surveyQuestions.map((q) => (
        <div key={q.id} className="mb-4 border rounded p-4">
          <h2 className="font-semibold">{q.question.title}</h2>
          <p className="text-sm text-gray-500 mb-1">{q.question.description}</p>
          <p className="text-gray-800">
            <span className="font-medium">Your Answer:</span>{' '}
            {responses[q.id] || <em className="text-red-600">No response</em>}
          </p>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Submit Survey
      </button>
    </div>
  );
};

export default ReviewPage;
