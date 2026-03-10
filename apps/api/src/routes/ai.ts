import dotenv from 'dotenv';
dotenv.config();
import { Router } from "express";
import { prisma } from '../db';
import Groq from 'groq-sdk';
import { Request, Response, RequestHandler } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router(); 
router.use(authMiddleware)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', async (req: Request, res: Response) => {
    try {
        const { id, title, content } = req.body;
        const userId = req.user?.userId;

    if (!content) {
      return res.status(400).json({ error: "No content provided in the note." });
    }

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a professional note-taking assistant. Your goal is to simplify complex information. 

                    Rules for your output:
                    1. Summarize the provided text into exactly 3 to 5 concise lines.
                    2. Use simple, jargon-free language that a high schooler would understand.
                    3. Use bullet points for clarity.
                    4. Focus only on the most important takeaways.
                    5. Do not include introductory phrases like "Here is a summary" or "The notes say."`
                }
                ,
                { role: "user", content: `Title: ${title}\nNote: ${content}` }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2, 
        });

        const rawSummary = completion.choices[0]?.message?.content || "Could not generate summary.";
        const cleanSummary = rawSummary
    .replace(/\n/g, ' ')      // Change newlines to spaces
    .replace(/\*/g, '')       // Remove all asterisks
    .replace(/\s+/g, ' ')     // Fix double spaces caused by removal
    .trim();

    res.json({ 
      noteId: id, 
      summary: cleanSummary 
    });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch from Groq" });
    }
}) as RequestHandler;

export default router;