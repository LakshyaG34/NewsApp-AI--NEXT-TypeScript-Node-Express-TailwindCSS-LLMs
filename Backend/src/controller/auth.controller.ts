import Auth from "../model/auth.model";
import express, {Request, Response} from "express"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/genTokSetCookie";

interface authTypes{
    id: string,
    name : string,
    email : string,
    password : string,
    confirmPassword : string,
}

export const signup = async(req : Request, res : Response) : Promise<void> =>{
    try{
        const {name, email, password, confirmPassword} = req.body as authTypes;
        if(!name || !email || !password || !confirmPassword)
        {
            res.status(400).json({err : "Missing Fields"})
        }
        const user = await Auth.findOne({email});
        if(user)
        {
            res.status(400).json({err : "User already exists"})
        }
        if(password !== confirmPassword)
        {
            res.status(400).json({err : "Password and confirmPassword mismatch"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Auth.create({
            name,
            email,
            password:hashedPassword
        })
        console.log(newUser);

        if(!newUser)
        {
            res.status(400).json({err : "Unable to SignUp"});
        }
        res.status(200).json({message : "Successfully created Account"});
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Error : "Internal Server Error"});
    }
}

export const signin = async(req : Request, res : Response) : Promise<Response | void> =>{
    try{
        const {email, password} = req.body as authTypes;
        if(!email || !password)
        {
            return res.status(400).json({err : "Missing Field"});
        }
        const user = await Auth.findOne({email});
        if(!user)
        {
            return res.status(400).json({err : "No user found"});
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword)
        {
            return res.status(400).json({err : "Password is Incorrect"});
        }
        generateTokenAndSetCookie(user.id, res);
        res.status(200).json({
            user : {
                _id : user._id,
                name : user.name,
                email : user.email
            }
        });
        console.log("signed In", user);
    }catch(err)
    {
        console.log(err);
        res.status(500).json({Error : "Internal Server Error"});
    }
}

export const getUser = async(req : Request, res : Response) : Promise<Response | void> =>{
    try{
        const {id} = req.params;
        
        const user = await Auth.findById(id);
        if(!user)
        {
            res.status(400).json({err : "The user does not exist with given ID"});
        }
        return res.status(200).json(user);
        // console.log("Logged out")
    }catch(err)
    {
        console.log("Internal Server err", err);
        res.status(500).json({Error : "Internal Server Error"});
    }
}

export const getMe = async(req : Request, res : Response) =>{
    try{
        const user = await Auth.findById(req.user?._id).select("-password");
        res.json({user});
    }catch(err)
    {
        console.log(err);
        res.status(500).json({error : "Server Error"});
    }
}

export const logout = async(req : Request, res : Response) : Promise<void> =>{
    try{
        res.clearCookie("jwt", {
            httpOnly:true,
            secure:true,
            sameSite : "strict"
        })
        res.status(200).json({message : "Logged Out Successfully"})
    }catch(err)
    {
        console.log("Unable to logout", err);
        res.status(500).json({Error : "Internal Server Error"})
    }
}