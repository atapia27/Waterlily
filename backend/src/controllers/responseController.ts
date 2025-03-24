import { Request,Response } from "express";
import prisma from "../db";

export const submitSurveyResponses = async (req: Request, res: Response) => {
    const { userId, responses} = req.body

    try{
        const createdResponses = await prisma.$transaction(
            responses.map((response: {surveyQuestionId: string, answer: string}) =>
                prisma.response.upsert({
                    where: { userId_surveyQuestionId: {userId, surveyQuestionId: response.surveyQuestionId}},
                    update: { answer: response.answer},
                    create: {userId,
                        surveyQuestionId: response.surveyQuestionId,
                        answer: response.answer
                    }
                })
        
            )
        )
        res.json(createdResponses)
    }
    catch (error){
        console.error(error)
        throw error
    }
}