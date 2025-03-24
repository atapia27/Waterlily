export const submitSurveyResponses = async (
    surveyId: string,
    userId: string,
    responses: { surveyQuestionId: string; answer: string }[]
  ) => {
    try {
      const res = await fetch(`http://localhost:5000/api/survey/${surveyId}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, responses }),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to submit responses: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (err) {
      console.error('Error submitting survey responses:', err);
      throw err;
    }
  };