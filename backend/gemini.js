// backend/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getFlashcardsFromText(text) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });


  const prompt = `
Extract Question and Answer pairs from the following study material:
"${text}"

Return output in JSON format:
[
  {
    "question": "What is ...?",
    "answer": "..."
  },
  ...
]
`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const raw = response.text();

    const jsonStart = raw.indexOf("[");
    const jsonEnd = raw.lastIndexOf("]");
    const jsonString = raw.slice(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    return [];
  }
}
