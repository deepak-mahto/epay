import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const Appbar = () => {
  const { isAuthenticated, logout, userName } = useAuth();

  return (
    <div className="shadow-md bg-white fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold text-blue-600">
          ePay
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard">
                <div className="text-slate-700">{userName}</div>
              </Link>
              <Link to="/dashboard">
                <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center">
                  <div className="text-xl font-semibold text-slate-700">
                    {userName[0]}
                  </div>
                </div>
              </Link>

              <button
                onClick={() => logout()}
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="border px-4 py-2 rounded-lg text-slate-700 hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
