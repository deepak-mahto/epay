import React from "react";
import useFetch from "../hooks/useFetch";

const Appbar = () => {
  const { userFirstName } = useFetch();

  return (
    <div className="shadow-md bg-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">ePay</div>
        <div className="flex items-center space-x-4">
          <div className="text-slate-700">Hello, {userFirstName}</div>
          <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center">
            <div className="text-xl font-semibold text-slate-700">
              {userFirstName[0]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
