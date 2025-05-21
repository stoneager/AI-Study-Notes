import mongoose from "mongoose";


// User Schema
const deckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }

});

const Deck = mongoose.model('Deck', deckSchema);
export default Deck;