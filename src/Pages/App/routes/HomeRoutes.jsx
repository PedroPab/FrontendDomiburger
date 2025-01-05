import { Route } from "react-router-dom";
import FormClient from "../../FormClient";
import ThankYou from "../../TanksYou/ThankYou"; // Importar la nueva página de agradecimiento

const HomeRoutes = () => {
  return (
    <>
      <Route path="/" element={<FormClient />} />
      <Route path="/gracias" element={<ThankYou />} /> {/* Nueva ruta */}
    </>
  );
}

export { HomeRoutes }