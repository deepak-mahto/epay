import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="py-2 text-sm flex justify-center text-slate-600">
      <div>{label}</div>
      <Link
        className="pointer underline pl-1 cursor-pointer text-blue-600 hover:text-blue-700"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default BottomWarning;
