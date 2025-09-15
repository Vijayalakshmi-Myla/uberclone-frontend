import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
         style={{ backgroundImage: "url('/images/uber-bg.avif')" }}>
      <LoginForm />
    </div>
  );
}
