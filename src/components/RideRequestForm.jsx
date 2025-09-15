"use client";
import { useState } from "react";
import { requestRide, createPaymentIntent } from "../../lib/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "../../components/StripeCheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function RequestRidePage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState(null);

  const handleRequestRide = async () => {
  const rideRes = await requestRide({
    riderId: "user-uuid", 
    pickup,
    dropoff,
    rideType: "economy",
  });

  if (rideRes.error) {
    alert(rideRes.error);
    return;
  }

  const rideId = rideRes.ride.id;

  const res = await createPaymentIntent(rideId);

  if (res.error) {
    alert(res.error);
  } else {
    setClientSecret(res.clientSecret);
    setAmount(res.amount);
  }
};

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Request a Ride</h2>

        {!clientSecret ? (
          <>
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              placeholder="Dropoff Location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full p-2 border rounded mb-3"
            />
            <button
              onClick={handleRequestRide}
              className="w-full py-2 bg-blue-600 text-white rounded-lg"
            >
              Request Ride
            </button>
          </>
        ) : (
          <div>
            <p className="mb-2">
              Please complete payment: <strong>₹{amount / 100}</strong>
            </p>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckoutForm
                clientSecret={clientSecret}
                onPaymentSuccess={() => {
                  alert("Ride booked successfully!");
                }}
              />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
