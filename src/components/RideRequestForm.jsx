'use client';
import { useState, useRef } from "react";
import { requestRide, createPaymentIntent } from "../lib/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "@/components/StripeCheckoutForm";
import { Autocomplete } from "@react-google-maps/api"; // ✅ remove LoadScript

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RequestRidePage({ userId, isLoaded }) {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(null);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);

  const pickupAutoRef = useRef(null);
  const dropoffAutoRef = useRef(null);

  const onPickupPlaceChanged = () => {
    if (pickupAutoRef.current) {
      const place = pickupAutoRef.current.getPlace();
      if (place?.formatted_address) setPickup(place.formatted_address);
      const loc = place?.geometry?.location;
      if (loc) setPickupCoords({ lat: loc.lat(), lng: loc.lng() });
    }
  };

  const onDropoffPlaceChanged = () => {
    if (dropoffAutoRef.current) {
      const place = dropoffAutoRef.current.getPlace();
      if (place?.formatted_address) setDropoff(place.formatted_address);
      const loc = place?.geometry?.location;
      if (loc) setDropoffCoords({ lat: loc.lat(), lng: loc.lng() });
    }
  };

  const handleRequestRide = async () => {
    if (!pickupCoords || !dropoffCoords) {
      alert("Please select both pickup and dropoff locations.");
      return;
    }
    const rideRes = await requestRide({
      riderId: userId,
      pickup: { address: pickup, ...pickupCoords },
      dropoff: { address: dropoff, ...dropoffCoords },
      rideType: "economy",
    });
    if (!rideRes?.ride) {
      alert("Ride request failed.");
      return;
    }
    const res = await createPaymentIntent(rideRes.ride.id);
    if (!res || res.error) {
      alert(res?.error?.message || "Payment intent failed");
      return;
    }
    setClientSecret(res.clientSecret);
    setAmount(res.amount);
  };

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <div className="p-2 flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        Start your ride 🚗
      </h1>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Request a Ride</h2>

        {!clientSecret ? (
          <>
            <label className="block mb-2 text-amber-950">Pickup Location</label>
            <Autocomplete
              onLoad={(ref) => (pickupAutoRef.current = ref)}
              onPlaceChanged={onPickupPlaceChanged}
            >
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                className="w-full p-2 border border-black rounded mb-3 text-black"
              />
            </Autocomplete>

            <label className="block mb-2 text-amber-950">Dropoff Location</label>
            <Autocomplete
              onLoad={(ref) => (dropoffAutoRef.current = ref)}
              onPlaceChanged={onDropoffPlaceChanged}
            >
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Enter dropoff location"
                className="w-full p-2 border border-black rounded mb-3 text-black"
              />
            </Autocomplete>

            <button
              onClick={handleRequestRide}
              className="w-full py-2 bg-blue-600 text-white rounded-lg"
            >
              Request Ride
            </button>
          </>
        ) : (
          <div>
            <p className="mb-2 text-green-950">
              Please complete payment: <strong>₹{amount / 100}</strong>
            </p>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckoutForm
                clientSecret={clientSecret}
                onPaymentSuccess={() => {
                  alert("Ride booked successfully!");
                  setClientSecret(null);
                  setAmount(null);
                  setPickup("");
                  setDropoff("");
                }}
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
