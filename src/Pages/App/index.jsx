import { BrowserRouter, useRoutes } from "react-router-dom"
import { ContextProvider } from "../../Context"
import Domiciliario from "../Domiciliario"
import Experimentos from "../Experimentos"
import Login from "../Login"
import Recepcion from "../Recepcion"

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Recepcion /> },
    { path: '/login', element: <Login /> },
    { path: '/recepcion', element: <Recepcion /> },
    { path: '/domiciliario', element: <Domiciliario /> },
    { path: '/domiciliarios', element: <Domiciliario /> },
    { path: '/experimentos', element: <Experimentos /> },
    { path: '/hola', element: <Experimentos /> },
    { path: '/*', element: <Recepcion /> },
  ])

  return routes
}

const App = () => {
  return (
    <ContextProvider>

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

    </ContextProvider>
  )
}

export default App