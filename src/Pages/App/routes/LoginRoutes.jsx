import { Route } from "react-router-dom"
import Login from "../../Login"

const LoginRoutes = () => {

  return [
    <Route key="login" path="/login" element={<Login />} />,
    // <Route path="/register" element={<Register />} />
  ]
}

export { LoginRoutes }