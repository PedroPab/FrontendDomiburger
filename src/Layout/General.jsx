import { ToastContainer } from "react-toastify"


const General = ({ children }) => {

  return (
    <>

      {children}

      <ToastContainer />
    </>
  )
}

export { General }