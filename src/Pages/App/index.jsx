import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecepcionRoutes } from "./routes/RecepcionRoutes"
import { CocinaRoutes } from "./routes/CocinaRoutes"
import { GeneralRoutes } from './routes/GeneralRoutes';
import { LoginRoutes } from './routes/LoginRoutes';
import { HomeRoutes } from './routes/HomeRoutes';
import { DomiciliarioRoutes } from './routes/DomiciliarioRoutes';
import { PreferencesProvider } from '../../Context/PreferencesContext';
// import { UserRoutes } from './routes/UserRoutes';

const AppRoutes = () => {
  return (
    <>
      <PreferencesProvider>
        <Routes>
          {HomeRoutes()}
          {LoginRoutes()}
          {GeneralRoutes()}
          {/* {CocinaRoutes()} */}
          {/* {DomiciliarioRoutes()} */}

        </Routes>

        <RecepcionRoutes />

        <DomiciliarioRoutes />

        <CocinaRoutes />


      </PreferencesProvider>
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