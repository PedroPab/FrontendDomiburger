import { Route } from "react-router-dom"
import Login from "../../Login"
import { Login1 } from "../../../components/Login/Login"
import { LOGIN_ROUTES } from "../../../Utils/const/namesRutes"
import PhoneAuth from "../../Login/PhoneAuth"

const LoginRoutes = () => {
  return (
    <Route path={LOGIN_ROUTES.path} >
      <Route index element={<Login />} />
      <Route path={LOGIN_ROUTES.routes.LOGIN_AUTH} element={<Login1 />} />
      <Route path="phone-auth" element={<PhoneAuth />} />

    </Route >
  )
}

export { LoginRoutes }