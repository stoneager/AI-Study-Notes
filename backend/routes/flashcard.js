import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import dotenv from "dotenv";
import Flashcard from '../models/flashcard.js';
import Deck from '../models/deck.js';
import fs from "fs/promises";
import { GoogleGenAI } from "@google/genai/node"; 

dotenv.config();
const router = express.Router();
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Setup multer
const upload = multer({ dest: "uploads/" });

// POST /generate-flashcards
router.post("/generate-flashcards", upload.single("pdf"), async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;
    if (!title || !createdBy) {
    return res.status(400).json({ message: 'Title and createdBy are required to create a deck' });
    }
    const fileBuffer = await fs.readFile(req.file.path);
    const pdfData = await pdfParse(fileBuffer);
    const content = pdfData.text;

    const newDeck = new Deck({ title, description, createdBy });
    await newDeck.save();

    const prompt = `
      Given the following study content, generate 5 flashcards in Question-Answer format.
      Content:
      ${content}
      Format: 
      Q: ...
      A: ...
      Q: ...
      A: ...
    `;

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash", // or "gemini-2.0-flash" if enabled
      contents:  prompt
    });
    
    const output = await result.text;

    const flashcards = [];
    const lines = output.split("\n").map(line => line.trim()).filter(Boolean);

    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].startsWith("Q:") && lines[i + 1].startsWith("A:")) {
        flashcards.push({
          question: lines[i].replace(/^Q:\s*/, ""),
          answer: lines[i + 1].replace(/^A:\s*/, ""),
        });
        i++;
      }
    }
    await Flashcard.insertMany(
      flashcards.map(pair => ({
        question: pair.question,
        answer: pair.answer,
        deck: newDeck._id
      }))
    );

    console.log(output);
    res.status(201).json({ flashcards });
  } catch (error) {
    console.error("Flashcard generation error:", error);
    res.status(500).json({ error: "Failed to generate flashcards" });
  } finally {
    // Clean up uploaded file
    await fs.unlink(req.file.path);
  }
});

router.get("/decks", async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: "userId required" });

  try {
    const decks = await Deck.find({ createdBy: userId });
    res.json(decks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/decks/:id/cards", async (req, res) => {
    try {
        const { id } = req.params;
        const flashcards = await Flashcard.find({ deck: id });
        res.json(flashcards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
