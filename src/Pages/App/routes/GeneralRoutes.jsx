import { Route } from "react-router-dom"
import Experimentos from "../../Experimentos"
import { LoginExp } from "../../Login/LoginExperimentos"
import { NotFoundPage } from "../../NotFoundPage"

const GeneralRoutes = () => {
  return (
    <>
      <Route key="experimentos" path="/experimentos" element={<Experimentos />} />
      <Route key="loginEx" path="loginEx" element={<LoginExp />} />
      <Route key="home" path="/home" element={<Experimentos />} />
      <Route key="404" path="*" element={<NotFoundPage />} />
    </>
  )
}

export { GeneralRoutes }