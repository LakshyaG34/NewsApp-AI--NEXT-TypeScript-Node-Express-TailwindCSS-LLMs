import express, {Request, Response} from "express"
import dotenv from "dotenv"
import cors from "cors";
import { dbConnection } from "./db";
import authRoutes from "./router/auth.router"
import aiRoutes from "./router/ai.router"
import cookieParser from "cookie-parser"
// import news from "../news.json";
// import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", aiRoutes);
// app.use(express.static(path.join(__dirname, "../../Frontend/out")))

app.get("/api/news", async(req : Request, res : Response) : Promise<void> =>{
    try{
        const {country, category} = req.query;
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEWS_API}`);
        const data = await response.json();
        res.json({articles : data.articles});
    }catch(err)
    {
        console.log(err);
    }
})

// app.get("*", (req : Request, res : Response)=>{
//     res.sendFile(path.join(__dirname, "../../Frontend/out/index.html"))
// })

app.listen(PORT, ()=>{
    dbConnection();
    console.log(`Server is running on ${PORT}`)
})