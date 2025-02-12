import { HelmetProvider } from "react-helmet-async"
import { ToastContainer } from "react-toastify"
import { UserNavbar } from "./UserNavbar"

const UserLayout = ({ children }) => {
  return (
    <>
      <HelmetProvider>
        <UserNavbar />
        {children}
        <ToastContainer />
      </HelmetProvider>
    </>
  )
}

export { UserLayout }