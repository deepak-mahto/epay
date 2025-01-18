import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const LandingPage = () => {
  const { isLoggedIn } = useFetch();
  return (
    <div className="min-h-screen flex flex-col">
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
          {!isLoggedIn && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
