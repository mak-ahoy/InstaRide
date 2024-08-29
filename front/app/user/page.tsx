"use client";

import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import { socket } from "@/socket";
import "./animations.css";

type Offer = {
  user: string;
  from: string;
  to: string;
  amount: string;
};

const Page = () => {
  const [showingOffers, setShowingOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const showOffersWithDelay = (offers: Offer[]) => {
      offers.forEach((offer, index) => {
        setTimeout(() => {
          setShowingOffers((prevOffers) => {
            const updatedOffers = [...prevOffers, offer];
            if (updatedOffers.length > 5) {
              updatedOffers.shift(); // Maintain a max limit if needed
            }
            return updatedOffers;
          });
          setTimeout(() => {
            setShowingOffers((prevOffers) =>
              prevOffers.filter((o) => o !== offer)
            );
          }, 10000); // Remove after 10 seconds
        }, index * 500); // Delay each offer
      });
    };

    // Single event listener for "offers"
    socket.on("offers", (newOffers: Offer[]) => {
      showOffersWithDelay(newOffers);
    });

    // Single event listener for "new-offer"
    socket.on("new-offer", (offer: Offer) => {
      // setShowingOffers((prevOffers) => {
      //   const updatedOffers = [offer, ...prevOffers];
      //   if (updatedOffers.length > 5) {
      //     updatedOffers.pop(); // Maintain a max limit if needed
      //   }
      //   return updatedOffers;
      // });
      showOffersWithDelay([offer, ...showingOffers])
    });

    // Cleanup
    return () => {
      socket.off("offers");
      socket.off("new-offer");
    };
  }, []);

  const handleGetOffers = () => {
    socket.emit("send_offers");
  };

  return (
    <>
      <div className="flex flex-col items-center bg-slate-700 min-h-screen">
        <h1 className="text-center mt-20 mb-8 text-white text-3xl font-bold">
          Available Offers
        </h1>

        {showingOffers.length === 0 && (
          <>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleGetOffers}
            >
              Get Offers
            </button>

            <p className="text-white text-center mt-5">No offers available</p>
          </>
        )}
        <div className="flex flex-col items-center w-full max-w-4xl mt-8 px-4">
          <TransitionGroup className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            {showingOffers.map((offer, index) => (
              <CSSTransition
                key={index}
                timeout={700} // Duration of the animation
                classNames="fade" // Prefix for CSS classes
              >
                <Card data={offer} timeLeft={10000} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
};

export default Page;
