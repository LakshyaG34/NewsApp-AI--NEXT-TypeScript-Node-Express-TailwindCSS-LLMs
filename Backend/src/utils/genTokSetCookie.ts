import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {Response} from "express"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const NODE_ENV = process.env.NODE_ENV as string;

const generateTokenAndSetCookie = async(id : string, res: Response) =>{
    const token = jwt.sign({id}, JWT_SECRET, {
        expiresIn:"15d"
    });
    res.cookie("jwt", token,{
        maxAge:15*24*60*60*1000,
        sameSite:"strict",
        secure:NODE_ENV === "production",
        httpOnly:true
    })   
}

export default generateTokenAndSetCookie;