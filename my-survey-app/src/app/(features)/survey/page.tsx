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
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Available Surveys:</h1>
      <SurveyList surveys={allSurveys} />
    </div>
  );
};

export default SurveyListPage;
