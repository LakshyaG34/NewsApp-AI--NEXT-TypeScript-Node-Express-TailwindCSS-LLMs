import express, {Request, Response} from "express"
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const googleGen = async(req : Request, res : Response) =>{
    const {text, targetLen} = req.body;
    try{
        const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});
        const prompt = `Translate the ${text} in ${targetLen}`;
        const result = await model.generateContent(prompt);
        res.json({translated : result.response.text()});
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Error : "Error in AI controller"});
    }
}