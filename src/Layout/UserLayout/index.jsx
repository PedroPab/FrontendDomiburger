import { HelmetProvider } from "react-helmet-async"
import { UserNavbar } from "./UserNavbar"

const UserLayout = ({ children }) => {
  return (
    <>
      <HelmetProvider>
        <UserNavbar />
        {children}
      </HelmetProvider>
    </>
  )
}

export { UserLayout }