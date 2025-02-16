import { ToastContainer } from "react-toastify"
import { NavbarAdmin } from "../components/Navbar/NavbarAdmin.jsx";


const LayoutRecepcion = ({ children }) => {

  return (
    <>
      <NavbarAdmin />

      {children}

      <ToastContainer />
    </>
  )
}

export default LayoutRecepcion