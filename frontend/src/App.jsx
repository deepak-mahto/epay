import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import LandingPage from "./pages/LandingPage";
import useFetch from "./hooks/useFetch";

function App() {
  const { isLoggedIn } = useFetch();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Dashboard /> : <LandingPage />}
          ></Route>
          <Route
            path="/signup"
            element={isLoggedIn ? <Dashboard /> : <Signup />}
          />
          <Route
            path="/signin"
            element={isLoggedIn ? <Dashboard /> : <Signin />}
          />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Signin />}
          />
          <Route
            path="/send"
            element={isLoggedIn ? <SendMoney /> : <Signin />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
