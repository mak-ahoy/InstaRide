"use client"; // Ensure this file is treated as a client-side component

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSearchParams } from 'next/navigation'
import { json } from "stream/consumers";




const marker = "/map-marker.svg";

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});


export default function Page() {
  const [coord, setCoord] = useState<any>([51.505, 74.3525]);
  const [dist, setDistance] = useState<any>(0);
  const [time, setTime] = useState<any>(0);
  const searchParams = useSearchParams()



  useEffect(() => {
    // Move client-side logic here
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCoord([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        setCoord(null);
      }
    }

    function distance(lat1: number, lon1: number, lat2: number, lon2: number) {
      const r = 6371; // km
      const p = Math.PI / 180;

      const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
        + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
        (1 - Math.cos((lon2 - lon1) * p)) / 2;

      return 2 * r * Math.asin(Math.sqrt(a));
    }

    getLocation();

    // Only set distance and time after coordinates are fetched
    if (coord && coord.length === 2) {
      const calculatedDistance = distance(30.375321, 69.345116, coord[0], coord[1]);
      setDistance(calculatedDistance.toFixed(2));
      setTime((calculatedDistance / 50.00).toFixed(2));
    }
  }, [coord]);

  return (
    <div className="flex flex-col items-center bg-slate-700 min-h-screen">
      <div className="w-full h-96 z-[0]">
        <MapContainer
          center={[30.375321, 69.345116]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coord} icon={myIcon}>
            <Popup>
              Source
            </Popup>
          </Marker>

          <Marker position={[30.375321, 69.345116]} icon={myIcon}>
            <Popup>
              Destination
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto mt-5">
        <div className="text-gray-900">
          <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
          <p className="mb-2">
            <span className="font-bold">Distance:</span> {dist} Km
          </p>
          <p className="mb-2">
            <span className="font-bold">Est:</span> {time} hrs / {(time * 60).toFixed(2)} mins
          </p>
          <p className="mb-2">
            <span className="font-bold">User:</span> {searchParams.get("user")}
          </p>
          <p className="mb-2">
            <span className="font-bold">From:</span> {searchParams.get("from")}
          </p>
          <p className="mb-2">
            <span className="font-bold">To:</span> {searchParams.get("to")}
          </p>
          <p className="mb-2">
            <span className="font-bold">Amount:</span> {searchParams.get("amount")}
          </p>
        </div>
      </div>

    </div>
  );
}
