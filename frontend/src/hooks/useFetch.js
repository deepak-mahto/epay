import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = () => {
  const [userBalance, setUserBalance] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserDetails(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get(
        "https://epay-ou6w.onrender.com/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserBalance(response.data.balance);
      setUserFirstName(response.data.firstName);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  return { userBalance, userFirstName, isLoggedIn };
};

export default useFetch;
