import { ToastContainer } from "react-toastify"


const General = ({ children }) => {

  return (
    <>
      Nav

      {children}

      <ToastContainer position="bottom-center" />
    </>
  )
}

export { General }