import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const dbConnection = async() =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("connected to DB");
    }catch(err)
    {
        console.log("Error Connecting to Mongo", err);
    }
}