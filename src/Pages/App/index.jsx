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
// import { UserRoutes } from './routes/UserRoutes';

const AppRoutes = () => {
  return (
    <>


      <ContextProvider>

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
          {/* {UserRoutes()} */}

        </Routes>
      </ContextProvider>

    </>
  );
}

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App