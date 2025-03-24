import express from "express"
import { createSurvey, getAllSurveys, getSurvey} from "../controllers/surveyController"
import { createSurveyQuestion } from "../controllers/questionController"
import { submitSurveyResponses } from "../controllers/responseController"
const router = express.Router()

// survey
router.post("/surveys", createSurvey)
router.get("/survey", getAllSurveys)
router.get("/survey/:surveyId", getSurvey)

// question
router.post("/survey/:surveyId/questions", createSurveyQuestion)

// response
router.post("/survey/:surveyId/responses", submitSurveyResponses)

module.exports = router
export default router

