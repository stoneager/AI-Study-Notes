import mongoose from 'mongoose';

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck', // References the Deck model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
export default Flashcard;
