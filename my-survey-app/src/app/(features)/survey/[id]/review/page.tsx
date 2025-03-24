'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSurveyStore } from '../../store/surveyStore';
import { USERS } from '@/constants/users';

const ReviewPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { survey, surveyQuestions, responses, submitResponses } = useSurveyStore();

  const userId = USERS[0].id; // Alice

  useEffect(() => {
    if (!survey || survey.id !== id) {
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black text-center">Review Your Responses</h1>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl space-y-4">
          {surveyQuestions.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{q.question.title}</h2>
                <p className="text-sm text-gray-600">{q.question.description}</p>
              </div>
              <div className="mt-4 text-gray-600">
                {responses[q.id] || <em className="text-red-600">No response</em>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="mt-6 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 cursor-pointer"
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
