import { PreferencesProvider } from "../../Context/PreferencesContext"
import { UserNavbar } from "./UserNavbar"

const UserLayout = ({ children }) => {
  return (
    <>
      <PreferencesProvider>
        <UserNavbar />
        {children}
      </PreferencesProvider>
    </>
  )
}

export { UserLayout }