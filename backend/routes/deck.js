import express from 'express';
import Deck from '../models/deck';

const router = express.Router(); 

// Create a Deck
router.post("/deck", async (req, res) => {
    const { title, description, createdBy } = req.body;

    if (!title || !createdBy) {
        return res.status(400).json({ message: "Please fill all required fields" });
    }

    try {
        const deck = new Deck({
            title,
            description,
            createdBy
        });
        await deck.save();
        console.log("Deck created successfully");
        res.status(201).json({ message: 'Deck created successfully', deck });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all Decks
router.get("/deck", async (req, res) => {
    try {
        const decks = await Deck.find();
        res.json(decks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// DELETE a Deck by ID
router.delete("/deck/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the deck by ID
        const deck = await Deck.findById(id);

        // If deck doesn't exist
        if (!deck) {
            return res.status(404).json({ message: "Deck not found" });
        }

        // Delete the deck
        await deck.remove();

        // Respond with success message
        res.json({ message: "Deck deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;

