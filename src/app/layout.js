import "../app/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Ride App",
  description: "Uber-like app with Next.js + Supabase backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
