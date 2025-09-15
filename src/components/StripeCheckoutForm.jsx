"use client";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function StripeCheckoutForm({ clientSecret, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    setLoading(false);

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful! 🎉");
        onPaymentSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded-md bg-white" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-2 bg-green-600 text-white rounded-lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
