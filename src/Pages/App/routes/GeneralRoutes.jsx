import { Route } from "react-router-dom"
import Experimentos from "../../Experimentos"
import { LoginExp } from "../../Login/LoginExperimentos"
import { NotFoundPage } from "../../NotFoundPage"

const GeneralRoutes = () => {
  return (
    <>
      <Route path="/experimentos" element={<Experimentos />} />
      <Route path="loginEx" element={<LoginExp />} />
      <Route path="/home" element={<Experimentos />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
}

export { GeneralRoutes }