import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from './routes/auth.cjs';
import flashcardRoutes from './routes/flashcard.js'; 
import cors from "cors";


const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URL).then(()=>{
    console.log("Database Connected");
    app.listen(PORT, () => console.log("Listening on PORT : "+PORT));

}).catch(e => console.log(e));

app.use('/api/auth', authRoutes);
app.use('/api/flashcards',flashcardRoutes);
