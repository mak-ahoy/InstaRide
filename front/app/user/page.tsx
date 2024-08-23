"use client"

import Card from '@/components/Card'
import NavBar from '@/components/NavBar'
import React, { useState, useEffect } from 'react'
import { socket } from '@/socket'

type Offer = {
  user: string;
  from: string;
  to: string;
  amount: string;
}

export default function Page() {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Set up the socket listener
    socket.on("offers", (newOffers: Offer[]) => {
      setOffers(newOffers);
    });

    // Clean up the socket listener on component unmount
    return () => {
      socket.off("offers");
    };
  }, []);

  const handleGetOffers = () => {
    socket.emit("send_offers");
  };

  return (
    <div className="flex flex-col items-center bg-slate-700 min-h-screen">
      <NavBar />

      <h1 className="text-center mt-20 mb-8 text-white text-3xl font-bold">Available Offers</h1>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={handleGetOffers}
      >
        Get Offers
      </button>

      <div className="flex flex-col items-center w-full max-w-4xl mt-8 px-4">
        {offers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            {offers.map((offer, index) => (
              <Card key={index} data={offer} />
            ))}
          </div>
        ) : (
          <p className="text-white text-center">No offers available</p>
        )}
      </div>
    </div>
  );
}
