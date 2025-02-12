import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { UserNavbar } from "./UserNavbar";
import Footer from "../LayoutCliente/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="layout-container">
      <HelmetProvider>
        <UserNavbar />
        <main className="content">{children}</main>
        <Footer />
        <ToastContainer />
      </HelmetProvider>
    </div>
  );
};

export { UserLayout };
