import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";

const Dashboard = () => {
  const [userBalance, setUserBalance] = useState("");
  useEffect(() => {
    const getBalance = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserBalance(response.data.balance);
    };
    getBalance();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 pt-20">
        <Balance value={parseFloat(userBalance).toFixed(2)} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
