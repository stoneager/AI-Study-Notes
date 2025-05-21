// src/pages/Layout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    // Redirect to login if token is missing
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white w-64 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="p-4 text-2xl font-bold border-b border-blue-700">FlashLearn</div>
        <nav className="flex flex-col p-4 space-y-4">
          <button onClick={() => navigate("/")} className="text-left hover:text-blue-300">Home</button>
          <button onClick={() => navigate("/decks")} className="text-left hover:text-blue-300">My Decks</button>
          <button onClick={() => navigate("/gemini")} className="text-left hover:text-blue-300">Generate Flashcards</button>
          <button onClick={handleLogout} className="text-left mt-8 text-red-300 hover:text-red-500">Logout</button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 bg-gray-100">
        <button
          className="md:hidden mb-4 p-2 bg-blue-800 text-white rounded"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <Outlet />
      </div>
    </div>
  );
}
