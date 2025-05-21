import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
function FlashcardGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
    
    let userId = '';
    
  
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded._id; 
      
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !pdfFile) {
      alert("Please provide a deck title and upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('createdBy', userId); // Pass user's ID or email
    formData.append('pdf', pdfFile);

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/flashcards/generate-flashcards', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Flashcards created successfully!');
      navigate('/decks'); // Redirect to decks page
    } catch (err) {
      console.error(err);
      alert('Upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex text-white items-center justify-center bg-gray-500">
      <form
        onSubmit={handleUpload}
        className="w-full rounded-3xl bg-grey-800 p-8 shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Study Material</h2>

        <input
          type="text"
          placeholder="Deck Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          required
          className="w-full mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Generating flashcards...' : 'Upload & Generate'}
        </button>
      </form>
    </div>
  );
}

export default FlashcardGenerator;
