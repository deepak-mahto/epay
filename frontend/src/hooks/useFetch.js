import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [userBalance, setUserBalance] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
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
      setUserFirstName(response.data.firstName);
    };
    getBalance();
  }, []);
  return { userBalance, userFirstName };
};

export default useFetch;
