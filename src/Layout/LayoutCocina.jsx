import { ToastContainer } from "react-toastify"
import { NavbarCocina } from "../components/Navbar/NavbarCocina";


const LayoutCocina = ({ children }) => {

  return (
    <>
      <NavbarCocina />

      {children}

      <ToastContainer />
    </>
  )
}

export default LayoutCocina