"use client";

import SurveyList from "./components/SurveyList";
import { useEffect } from "react";
import { useSurveyStore } from "./store/surveyStore";

const SurveyListPage = () => {
  const { allSurveys, fetchAllSurveys } = useSurveyStore();

  useEffect(() => {
    fetchAllSurveys().catch((err) => {
      console.error('Failed to fetch:', err);
    });
  }, []); // ✅ runs only once

  return (
<div className="flex items-center justify-start flex-col min-h-screen bg-white p-12 ">
  <h1 className="mb-4 text-2xl font-bold text-black">Available Surveys:</h1>
  <SurveyList surveys={allSurveys} />
</div>

  );
};

export default SurveyListPage;
