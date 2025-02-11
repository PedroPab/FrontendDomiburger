import { Route } from "react-router-dom";
import FormClient from "../../FormClient";
import ThankYou from "../../TanksYou/ThankYou"; // Importar la nueva página de agradecimiento
import MiPedido from "../../MiPedido";
import Nosotros from "../../Nosotros"; // Importar la nueva página "Nosotros"

const HomeRoutes = () => {
  return (
    <>

      <Route path="/" element={<FormClient />} />

      <Route path="/gracias" element={<ThankYou />} />
      <Route path="/mi-pedido" element={<MiPedido />} />
      <Route path="/nosotros" element={<Nosotros />} />
    </>
  );
}

export { HomeRoutes }