import { Request,Response } from "express";
import prisma from "../../db";

export const createSurvey = async (req: Request, res: Response) => {
    const {title} = req.body

    try {
        const survey = await prisma.survey.upsert({
            where: {title},
            update: {},
            create: {title},
        })
        res.json(survey)
    }
    catch (error){
        console.error(error)
        throw error
    }
}

export const getAllSurveys = async (req: Request, res: Response) => {
    const surveys = await prisma.survey.findMany({
        select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: {
            createdAt: "desc"
        },
    })

    res.json(surveys)
}

export const getSurvey = async (req: Request, res: Response) => {
    const {surveyId} = req.params

    const survey = await prisma.survey.findUnique({
        where: {id: surveyId},
        select: {
            title: true,
            surveyQuestions: {
                orderBy: {createdAt: "asc"},
                select:{
                    id: true,
                    question: {},
                }
            }
        }
    })

    if (!survey){
        res.status(404).json({ message: "Survey not found"})
        return
    }

    res.json(survey)
}
