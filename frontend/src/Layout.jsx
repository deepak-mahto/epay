import { Outlet } from "react-router-dom";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./AuthContext/AuthContext";

const Layout = () => {
  return (
    <div>
      <AuthProvider>
        <Appbar />
        <Outlet />
        <Footer />
      </AuthProvider>
    </div>
  );
};
export default Layout;
