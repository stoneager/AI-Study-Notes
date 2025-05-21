// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Homes';
import Login from './pages/Login';
import Register from './pages/Register';
import Decks from './pages/Decks';
import Layout from "./pages/Layout";
import ProtectedRoute from './pages/ProtectedRoute';
import FlashcardGenerator from './pages/Gemini';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/decks" element={<ProtectedRoute><Decks /></ProtectedRoute>} />
          <Route path="/gemini" element={<ProtectedRoute><FlashcardGenerator /></ProtectedRoute>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
