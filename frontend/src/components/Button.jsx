import React from "react";

const Button = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-all duration-200"
    >
      {label}
    </button>
  );
};

export default Button;
