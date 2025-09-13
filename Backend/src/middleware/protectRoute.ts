import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import Auth from "../model/auth.model"
import dotenv from "dotenv"
dotenv.config();

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: {
                _id: string;
                name: string;
                email: string
            }
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET as string;

interface JwtTypes{
    id : string;
}


const protectRoute = async(req : Request, res : Response, next : NextFunction) : Promise<Response | void> =>{
    try{
        const token = req.cookies.jwt;
        console.log("The token is :-", token);
        console.log("The cookie is :-", req.cookies);
        if(!token)
        {
            return res.status(404).json({err : "Unauthenticated - No token"});
        }

        const decoded = jwt.verify(token, JWT_SECRET) as JwtTypes;
        console.log("The decoded is :-", decoded);
        if(!decoded)
        {
            res.status(404).json({err : "Unauthenticated - Unable to verify Token"});
            return;
        }

        const user = await Auth.findById(decoded.id);
        if(!user)
        {
            return res.status(404).json({err : "NO user found"});
        }
        req.user = {
            _id : user._id.toString(),
            name : user.name,
            email : user.email
        }
        next();

    }catch(err)
    {
        console.log("Error In protectRoute", err);
        res.status(500).json({Error : "Internal Server Error"});
    }
}

export default protectRoute;