import React from "react";

const Balance = ({ value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="text-slate-600 text-lg font-medium">Your Balance</div>
      <div className="text-3xl font-bold text-slate-800">Rs {value}</div>
    </div>
  );
};

export default Balance;
