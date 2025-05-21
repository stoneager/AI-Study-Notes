import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      console.log("Signing token with secret:", process.env.JWT_SECRET);
      

      localStorage.setItem('token', res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert('Login failed : '+err);
    }
  };

  return (
    
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-800 px-4">
      <h1 className='text-4xl font-bold text-white mb-8'>Flash Learn</h1>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
        <a href="/register" className="mt-20 underline text-red  hover:text-blue-300">Register</a>
      </form>
    </div>
  );
}
