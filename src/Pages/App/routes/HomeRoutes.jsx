import { Route } from "react-router-dom";
import FormClient from "../../FormClient";
import ThankYou from "../../TanksYou/ThankYou"; // Importar la nueva página de agradecimiento
import MiPedido from "../../MiPedido";
import Nosotros from "../../Nosotros"; // Importar la nueva página "Nosotros"
import { AuthProvider } from "../../../Context/AuthContext";

const HomeRoutes = () => {
  return (
    <>

      <Route path="/" element={<AuthProvider ><FormClient /></AuthProvider>} />

      <Route path="/gracias" element={<ThankYou />} />
      <Route path="/mi-pedido" element={<MiPedido />} />
      <Route path="/nosotros" element={<Nosotros />} />
    </>
  );
}

export { HomeRoutes }