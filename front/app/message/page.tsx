"use client";

import { useState, useEffect } from "react";

export default function Users() {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Enter key pressed, form submission prevented.');
    }
  };


  const sendMessage = (e:Event) => {
    e.preventDefault();
    if (inputValue.trim()) {
      console.log("Message Sent:", inputValue);
      setHistory([...history, inputValue])
      setInputValue(""); // Clear the input after sending
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-6 text-black">Users</h1>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <div>
          { history.map((msg) => {
            return (
              <>
                {<div className="chat chat-end m-1">
                  <div className="chat-bubble">{msg}</div>
                </div>}
              </>
            );
          })}
        </div>
        <div className="card-body">
          <form className="w-full max-w-sm" onKeyDown={handleKeyPress}>
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
      </div>
    </div>
  );
}
