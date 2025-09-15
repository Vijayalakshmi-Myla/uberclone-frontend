import RegistrationForm from "../../components/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('/images/uber-bg.avif')" }}>
      <RegistrationForm />
    </div>
  );
}
