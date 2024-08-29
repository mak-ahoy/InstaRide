"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

type CardProps = {
  data: {
    user: string;
    from: string;
    to: string;
    amount: string;
  };
  timeLeft: number;
};




const Card: React.FC<CardProps> = ({ data, timeLeft }) => {
  const router = useRouter();


  const handleGetLocation = ()=> {
    router.push(`/map?user=${data.user}&from=${data.from}&to=${data.to}&amount=${data.amount}`);
    // console.log(query)
  }
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    const timeInSeconds = time / 1000;
    const timerInterval = 1000; // Update every second

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - timerInterval;
      });
    }, timerInterval);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="card bg-neutral text-neutral-content w-full max-w-xs border rounded-lg shadow-sm mt-0">
      <div className="card-body p-3">
        <h2 className="card-title text-lg font-semibold mb-2">Offer</h2>
        <div className="text-sm mb-3">
          <p><strong>User: </strong>{data.user}</p>
          <p><strong>From: </strong>{data.from}</p>
          <p><strong>To: </strong>{data.to}</p>
          <p><strong>Amount: </strong><span className="font-semibold">{data.amount}</span></p>
        </div>
        <div className="card-actions flex justify-between">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleGetLocation}>
            Accept
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
            Reject
          </button>
        </div>
      </div>
      <div className="card-footer p-2">
        <div className="status-bar">
          <div
            className="status-bar-fill"
            style={{ width: `${(time / 10000) * 100}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
