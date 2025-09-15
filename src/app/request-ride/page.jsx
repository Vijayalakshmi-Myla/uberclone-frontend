import RideRequestForm from "../../components/RideRequestForm";
import { useAuth } from "../../context/AuthContext";

export default function RequestRidePage() {
  const { user } = useAuth();
  if (!user) return <p className="text-center mt-10">Please login first</p>;

  return <RideRequestForm rider_id={user.id} />;
}
