import { useState } from 'react';

export default function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto cursor-pointer perspective" onClick={() => setFlipped(!flipped)}>
  <div className={`relative w-full h-48 transition-transform duration-500 transform-style preserve-3d ${flipped ? 'rotate-y-180' : ''}`}>
    <div className="absolute w-full h-full bg-white p-6 rounded shadow-md backface-hidden">
      <h3 className="text-lg font-semibold text-blue-700">Q:</h3>
      <p className="text-gray-800 mt-2">{question}</p>
    </div>
    <div className="absolute w-full h-full bg-green-100 p-6 rounded shadow-md rotate-y-180 backface-hidden">
      <h3 className="text-lg font-semibold text-green-700">A:</h3>
      <p className="text-gray-800 mt-2">{answer}</p>
    </div>
  </div>
</div>

  );
}
