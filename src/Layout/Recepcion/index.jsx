import { ToastContainer } from "react-toastify"
import { NavbarRecepcion } from "../../components/Navbar/NavbarRecepcion";


const LayoutRecepcion = ({ children }) => {

  return (
    <>
      <NavbarRecepcion />

      {children}

      <ToastContainer />
    </>
  )
}

export default LayoutRecepcion