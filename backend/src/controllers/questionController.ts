import { Request,Response } from "express";
import prisma from "../db";

export const createSurveyQuestion = async (req: Request, res: Response) => {
    const { surveyId } = req.params
    // what we need for a question
    const {title, description, questionType} = req.body

    try{
        const question = await prisma.question.upsert({
            where: {title_description: {title, description}},
            update: {},
            create: {
                title,
                description,
                questionType
            }
        })

        await prisma.surveyQuestion.upsert({
            where: { surveyId_questionId: {surveyId,questionId: question.id}},
            update: {},
            create: {
                surveyId,
                questionId: question.id
            }
        })
        res.json(question)
    }
    catch (error){
        console.error(error)
        throw error
    }
}