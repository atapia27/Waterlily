import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSurvey, getAllSurveys } from '../api/surveyApi';
import { submitSurveyResponses } from '../../response/api/responseAPI';
import { Survey, SurveyQuestion } from '@/types';



type SurveyStore = {
  survey: Survey | null;
  surveyQuestions: SurveyQuestion[];
  allSurveys: Survey[];
  responses: Record<string, string>;

  setSurvey: (surveyId: string) => Promise<void>;
  fetchAllSurveys: () => Promise<void>;
  updateResponse: (surveyQuestionId: string, answer: string) => void;
  submitResponses: (surveyId: string, userId: string) => Promise<void>;
};

export const useSurveyStore = create<SurveyStore>()(
  persist(
    (set, get) => ({
      survey: null,
      surveyQuestions: [],
      allSurveys: [],
      responses: {},

      setSurvey: async (surveyId: string) => {
        const data = await getSurvey(surveyId);
        console.log("Fetched survey", data)

        set({
          survey: {
            id: surveyId,
            title: data.title,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          },
          surveyQuestions: data.surveyQuestions,
          responses: {},
        });
      },

      fetchAllSurveys: async () => {
        const allSurveys = await getAllSurveys();
        console.log("fetched all surveys:, ", allSurveys)
        set({ allSurveys });
      },
      // using the input field, we should get the information for our responses
      // allows responses to be in our store, for when we want to press review button
      updateResponse: (surveyQuestionId, answer) => {
        set((state) => ({
          responses: {
            ...state.responses,
            [surveyQuestionId]: answer,
          },
        }));
      },


      submitResponses: async (surveyId, userId) => {
        const { responses } = get();
        const payload = Object.entries(responses).map(
            ([surveyQuestionId, answer]) => ({
          surveyQuestionId,
          answer,
        }));

        if (payload.length ===0 ){
            console.warn("No responses to")
            return
        }

        try {
           const res = await submitSurveyResponses(surveyId, userId, payload);
            console.log(res)
        }
        catch(error) {
            console.error(error)
        }

      },
    }),
    {
      name: 'survey-store',
    }
  )
);
