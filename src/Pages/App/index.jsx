import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { ContextProvider } from "../../Context"
import { RecepcionRoutes } from "./routes/RecepcionRoutes"
import { CocinaRoutes } from "./routes/CocinaRoutes"
import { GeneralRoutes } from './routes/GeneralRoutes';
import { LoginRoutes } from './routes/LoginRoutes';
import { HomeRoutes } from './routes/HomeRoutes';
import { EstadisticasRoutes } from './routes/EstadisticasRoutes';
import { CodigoRoutes } from './routes/CodigoRoutes';
import { ClientesRoutes } from './routes/ClientesRoutes';
import { DomiciliarioRoutes } from './routes/DomiciliarioRoutes';

const AppRoutes = () => {
  return (

    <Routes>
      {HomeRoutes()}
      {LoginRoutes()}
      {GeneralRoutes()}
      {RecepcionRoutes()}
      {EstadisticasRoutes()}
      {CodigoRoutes()}
      {CocinaRoutes()}
      {ClientesRoutes()}
      {DomiciliarioRoutes()}
    </Routes>
  );
}

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ContextProvider>
  )
}

export default App