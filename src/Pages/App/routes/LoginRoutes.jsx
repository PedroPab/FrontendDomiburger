import { Route, Routes } from "react-router-dom"
import Login from "../../Login"
import { Login1 } from "../../../components/Login/Login"

const LoginRoutes = () => {

  return (
    <Routes>
      <Route path="/login" >
        <Route index element={<Login />} />
        <Route path="login1" element={<Login1 />} />
      </Route>
    </Routes>
  )
}

export { LoginRoutes }