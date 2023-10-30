import { BrowserRouter, useRoutes } from "react-router-dom"
import Recepcion from "../Recepcion"
import { ContextProvider } from "../../Context"

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Recepcion /> },
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