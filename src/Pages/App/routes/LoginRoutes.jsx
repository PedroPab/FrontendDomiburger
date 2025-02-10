import { Route } from "react-router-dom"
import Login from "../../Login"
import { Login1 } from "../../../components/Login/Login"
import { ContextProvider } from "../../../Context"

const LoginRoutes = () => {

  return (
    <Route path="/login" >

      <Route index element={<Login />} />
      <Route path="login1" element={<Login1 />} />
    </Route >
  )
}

export { LoginRoutes }