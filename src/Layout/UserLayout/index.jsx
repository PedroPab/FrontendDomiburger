import { UserNavbar } from "./UserNavbar"

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      {children}

    </>
  )
}

export { UserLayout }