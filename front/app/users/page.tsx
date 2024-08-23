"use client"

import { useState, useEffect } from 'react';

export default function Users() {
  const [inputValue, setInputValue] = useState('');

  

  const sendMessage = () => {
    if (inputValue.trim()) {
        console.log("Message Sent:", inputValue)
      setInputValue(''); // Clear the input after sending
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-6 text-black">Users</h1>
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter Message"
            aria-label="Enter Message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
