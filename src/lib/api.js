const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const registerUser = async (data) => {
  const res = await fetch(`${BACKEND_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const requestRide = async (data) => {
  const res = await fetch(`${BACKEND_URL}/request-ride`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getRideHistory = async (user_id, role) => {
  const res = await fetch(`${BACKEND_URL}/rides?user_id=${user_id}&role=${role}`);
  return res.json();
};

export const completeRide = async (data) => {
  const res = await fetch(`${BACKEND_URL}/complete-ride`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const rateDriver = async (data) => {
  const res = await fetch(`${BACKEND_URL}/rate-driver`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getAvailableRides = async () => {
  const res = await fetch(`${BACKEND_URL}/rides/available`);
  return res.json();
};

export const acceptRide = async (data) => {
  const res = await fetch(`${BACKEND_URL}/rides/accept`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const createPaymentIntent = async (rideId) => {
  const res = await fetch(`${BACKEND_URL}/payments/create-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideId }),
  });
  return res.json();
};
