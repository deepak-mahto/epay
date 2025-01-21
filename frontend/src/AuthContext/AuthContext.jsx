import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUserName = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUserName(response.data.firstName);
    };

    if (isAuthenticated) {
      getUserName();
    }
  }, [isAuthenticated]);

  const signup = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const signin = () => {
    navigate("/dashboard");
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signup,
        signin,
        logout,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
