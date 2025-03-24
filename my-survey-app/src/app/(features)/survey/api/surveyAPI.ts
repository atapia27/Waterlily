export const getAllSurveys = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/survey', {
        method: 'GET',
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch surveys: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (err) {
      console.error('Error fetching all surveys:', err);
      throw err;
    }
  };

export const getSurvey = async (surveyId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/survey/${surveyId}`, {
        method: 'GET',
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch survey: ${res.statusText}`);
      }
  
      return await res.json();
    } catch (err) {
      console.error(`Error fetching survey ${surveyId}:`, err);
      throw err;
    }
  };