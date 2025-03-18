import { ToastContainer } from "react-toastify"

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer position="bottom-center" />

    </>
  )
}

export default Layout