"use client"
import { useState } from 'react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await fetch('http://localhost:4000/api/v1/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage: input }),
    });
    
    const data = await res.json();
    setResponse(data.reply);
  };

  return (
    <div className="p-10">
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 text-black"
        placeholder="Ask something..."
      />
      <button onClick={handleSend} className="bg-blue-500 p-2 ml-2">Send</button>
      <div className="mt-5 p-4 bg-gray-100 text-black">
        <strong>AI:</strong> {response}
      </div>
    </div>
  );
}