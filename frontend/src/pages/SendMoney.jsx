import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Appbar from "../components/Appbar";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const naviagte = useNavigate();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="bg-white w-96 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
            Send Money
          </h2>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-2xl text-white font-semibold">
                {name[0].toUpperCase()}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-slate-800">{name}</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-slate-700 mb-2"
                htmlFor="amount"
              >
                Amount (in Rs)
              </label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                id="amount"
                placeholder="Enter amount"
              />
            </div>
            <button
              onClick={() => {
                axios.post(
                  "https://epay-ou6w.onrender.com/api/v1/account/transfer",
                  {
                    to: id,
                    amount,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                naviagte("/dashboard");
              }}
              className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
