import React from "react";
import { Link } from "react-router-dom";
import Appbar from "../components/Appbar";

const LandingPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      <Appbar />
      <div
        className="flex-1 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,1) 0%, rgba(168,85,247,1) 50%, rgba(236,72,153,1) 100%)",
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Fast, Secure, and Easy Payments
          </h1>
          <p className="text-xl mb-8">
            Send and receive money instantly with ePay.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="bg-transparent border border-white text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {currentYear} ePay.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
