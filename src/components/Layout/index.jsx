import { ToastContainer } from "react-toastify"

 
const Layout = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer position="bottom-left" />
    </>
  )
}

export default Layout