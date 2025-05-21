import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Flashcard from './Flashcard';

export default function DecksPage() {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id || decoded._id;
  }

  const [decks, setDecks] = useState([]);
  const [selectedDeckId, setSelectedDeckId] = useState(null);
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/flashcards/decks?userId=${userId}`);
        setDecks(res.data);
      } catch (err) {
        console.error("Failed to fetch decks:", err);
      }
    };

    fetchDecks();
  }, [userId]);

  const loadFlashcards = async (deckId) => {
    setSelectedDeckId(deckId);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/flashcards/decks/${deckId}/cards`);
      setFlashcards(res.data);
    } catch (err) {
      console.error("Failed to fetch flashcards:", err);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Decks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {decks.map((deck) => (
          <div
            key={deck._id}
            className={`p-4 border rounded-lg shadow-md cursor-pointer transition hover:shadow-xl ${selectedDeckId === deck._id ? 'bg-blue-100' : 'bg-white'}`}
            onClick={() => loadFlashcards(deck._id)}
          >
            <h2 className="text-xl font-semibold mb-2">{deck.title}</h2>
            <p className="text-gray-600">{deck.description}</p>
          </div>
        ))}
      </div>

      {selectedDeckId && (
        <div >
          <h2 className="text-2xl font-bold mb-4 text-center">Flashcards</h2>
          {flashcards.length === 0 ? (
  <p className="text-center text-gray-500">No flashcards available.</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {flashcards.map((card, idx) => (
      <Flashcard key={idx} question={card.question} answer={card.answer} />
    ))}
  </div>
)}

        </div>
      )}
    </div>
  );
}
