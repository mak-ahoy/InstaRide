"use client"

import Card from '@/components/Card'
import NavBar from '@/components/NavBar'
import React, { useState, useEffect } from 'react'
import { socket } from '@/socket'
import { toast, ToastContainer, cssTransition } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './toast.module.css' // Import CSS module
import "animate.css/animate.min.css";


type Offer = {
  user: string;
  from: string;
  to: string;
  amount: string;
}

const bounce = cssTransition({
  enter: "animate__animated animate__fadeInUpBig",
  exit: "animate__animated   animate__fadeOutUpBig"
});


const CustomCard = ({ offer }: { offer: Offer }) => (
  <div className={`card bg-neutral text-neutral-content w-full border rounded-lg shadow-sm ${styles.customCard}`}>
    <div className="card-body p-3 min-w-full">
      <h2 className="card-title text-lg font-semibold mb-2">Offer</h2>
      <div className="text-sm mb-3">
        <p><strong>User: </strong>{offer.user}</p>
        <p><strong>From: </strong>{offer.from}</p>
        <p><strong>To: </strong>{offer.to}</p>
        <p><strong>Amount: </strong><span className="font-semibold">{offer.amount}</span></p>
      </div>
      <div className="card-actions flex justify-between">
        <button className="btn btn-error text-white text-xs font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105">Accept</button>
        <button className="btn btn-white border border-gray-300 text-white-700 text-xs font-semibold py-1 px-3 rounded-md transition-transform transform hover:scale-105">Deny</button>
      </div>
    </div>
  </div>
);


const Page = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [visibleOffers, setVisibleOffers] = useState<Offer[]>([]);

  useEffect(() => {
    // Function to show the toast notifications with a delay
    const showOffersWithDelay = (offers: Offer[]) => {
      offers.forEach((offer, index) => {
        setTimeout(() => {
          
        }, index * 500); // Delay each toast by 1 second
      });
    };

    // Set up the socket listener
    socket.on("offers", (newOffers: Offer[]) => {
      setOffers(newOffers);
      showOffersWithDelay(newOffers); // Show toast for new offers
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
    <>
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
        <div>
        </div>
      </div>
    </>
  );
}

export default Page;
