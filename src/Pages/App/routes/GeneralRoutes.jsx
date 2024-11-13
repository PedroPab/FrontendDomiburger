import { Route } from "react-router-dom"
import Experimentos from "../../Experimentos"
import NotFoundPage from "../../NotFoundPage"
import { LoginExp } from "../../Login/LoginExperimentos"

const GeneralRoutes = () => {
  return [
    <Route key="experimentos" path="/experimentos" element={<Experimentos />} />,
    <Route key="404" path="/*" element={<NotFoundPage />} />,
    <Route key="loginEx" path="loginEx" element={<LoginExp />} />,
    <Route key="home" path="/home" element={<Experimentos />} />,
  ]
}

export { GeneralRoutes }