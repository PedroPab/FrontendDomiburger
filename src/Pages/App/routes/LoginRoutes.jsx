import { Route } from "react-router-dom"
import Login from "../../Login"
import { Login1 } from "../../../components/Login/Login"

const LoginRoutes = () => {

  return [
    <Route key="login" path="/login" element={<Login />} />,
    <Route key="login1" path="/login1" element={<Login1 />} />,
    // <Route path="/register" element={<Register />} />
  ]
}

export { LoginRoutes }