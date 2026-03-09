import {Router} from  "express";
import OpenAI from "openai";

const router = Router();
const openai = new OpenAI({ apikey: process.env.OPEN_API_KEY });

router.post("/summarize", async (req, res)=>{
    const {content} = req.body;

    try{
        const response = await openai.chat.completions.create({
            model:"gemenai-3-flash",
            message :[
                {role: "system", content :"You are a helpful assistant that summarizes notes into 3-5 concise bullet points."},
                {role: "user", content :`Please summarize this note:${content}`}
            ]
        })
    } catch (error){
        res.status(400).json({
            message:"some error while summaring your note"
        })
    }
})