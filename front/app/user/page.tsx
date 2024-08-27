"use client";

import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import { socket } from "@/socket";
import "./animations.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Offer = {
  user: string;
  from: string;
  to: string;
  amount: string;
};

const position: [number, number] = [51.505, -0.09]; // Leaflet position

const Page = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [showingOffers, setShowingOffers] = useState<Offer[]>([]);
  const [coord, setCoord] = useState<any>([51.505, -0.09])


  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        setCoord([position.coords.latitude, position.coords.longitude])

      });
    } else { 
      setCoord(null)
    }
  }

  useEffect(() => {
    getLocation();
    const showOffersWithDelay = (offers: Offer[]) => {
      offers.forEach((offer, index) => {
        setTimeout(() => {
          setShowingOffers((prevOffers) => [...prevOffers, offer]);
          setTimeout(() => {
            setShowingOffers((prevOffers) =>
              prevOffers.filter((o) => o !== offer)
            );
          }, 10000); // Remove after 10 seconds
        }, index * 500); // Delay each offer
      });
    };

    socket.on("offers", (newOffers: Offer[]) => {
      setOffers([]);
      showOffersWithDelay(newOffers);
    });

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

        <div className="w-full h-64">
          <MapContainer center={coord} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <h1 className="text-center mt-20 mb-8 text-white text-3xl font-bold">
          Available Offers
        </h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleGetOffers}
        >
          Get Offers
        </button>
        {showingOffers.length === 0 && (
          <p className="text-white text-center mt-5">No offers available</p>
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
