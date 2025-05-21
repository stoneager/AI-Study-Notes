/*
import fs from 'fs';
import pdf from 'pdf-parse/lib/pdf-parse.js';

const buffer = fs.readFileSync('ECC (2).pdf');
export function cleanText(rawText) {
  return rawText
    .replace(/[\r\n]+/g, ' ')           // Replace line breaks with space
    .replace(/\s{2,}/g, ' ')            // Collapse multiple spaces
    .replace(/•/g, '-')                 // Replace bullet characters
    .replace(/[^\x00-\x7F]/g, '')       // Remove weird symbols
    .trim();
};

pdf(buffer).then((data) => {
  const ans = cleanText(data.text);
  console.log(ans); // ✅ use this for sending to OpenAI
});
*/

// test.js
import { GoogleGenAI } from "@google/genai/node"; // ✅ Force browser-style API key usage
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash", // or "gemini-2.0-flash" if enabled
      contents:  "Explain how AI works in a few words"
    });

    const output = await result.text;
    console.log("Output:\n", output);
  } catch (err) {
    console.error("Flashcard generation error:", err);
  }
}

main();
