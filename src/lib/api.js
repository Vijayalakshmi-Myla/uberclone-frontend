const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

//Profile details
export const fetchUserProfile = async (userId) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  const data = await res.json();
  console.log("profile fetched data:", data);
  if (!res.ok) throw new Error(data.message || "Failed to fetch user profile");
  return data.profile;
};

// Register user
export const registerUser = async ({ name, email, password, role, vehicle_number,
  vehicle_model }) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role, vehicle_number,
      vehicle_model }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

// Login user
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

// Logout user 
export const logoutUser = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
};

//.................RIDE DETAILS.........../////////////////////////

// Request a ride
export const requestRide = async (rideData) => {
  const res = await fetch(`${BASE_URL}/rides/request-ride`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rideData),
  });

  const data = await res.json();
  if (!res.ok) {
    console.log("ride requesting error:", data);
    throw new Error(data.message || "Request ride failed");
  }
  return data;
};

// Get ride history
export const getRideHistory = async (userId, role) => {
  const res = await fetch(`${BASE_URL}/rides/history?user_id=${userId}&role=${role}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch ride history");
  return data;
};

// Complete a ride
export const completeRide = async (rideId, updates) => {
  const res = await fetch(`${BASE_URL}/complete-ride`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideId, updates }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Ride completion failed");
  return data;
};

// Rate driver
export const rateDriver = async ({ rideId, rating }) => {
  const res = await fetch(`${BASE_URL}/rate-driver`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideId, rating }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Rating failed");
  return data;
};

// Get available rides
export const getAvailableRides = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user.id || !user.role) {
    throw new Error("Missing user_id or role in local storage");
  }

  const res = await fetch(
    `${BASE_URL}/rides/available?user_id=${user.id}&role=${user.role}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch available rides");
  return data;
};



// Accept ride
export const acceptRide = async ({ ride_id, driver_id }) => {
  const res = await fetch(`${BASE_URL}/api/rides/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ride_id, driver_id })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error ${res.status}: ${errorText}`);
  }

  return await res.json();
};

//.................PAYMENT DETAILS.........../////////////////////////

export const createPaymentIntent = async (rideId) => {
  const res = await fetch(`${BASE_URL}/payments/createIntent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rideId }),
  });

  const data = await res.json();
  console.log("Payment intent response:", data);
  if (!res.ok) throw new Error(data.message || "Failed to create payment intent");
  return data;
};
