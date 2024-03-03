import { ToastContainer } from "react-toastify"
import { useContext, } from 'react'
import { MiContexto } from '../../Context'
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import { NavbarRecepcion } from "../../components/Navbar/NavbarRecepcion";


const LayoutRecepcion = ({ children }) => {
  const context = useContext(MiContexto)

  return (
    <>
      <ContextProviderRecepcion>

        <NavbarRecepcion
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />

        {children}

        <ToastContainer />
      </ContextProviderRecepcion>
    </>
  )
}

export default LayoutRecepcion