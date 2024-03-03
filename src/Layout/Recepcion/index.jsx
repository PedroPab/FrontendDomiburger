import { ToastContainer } from "react-toastify"
import { useContext, } from 'react'
import { MiContexto } from '../../Context'
import NavbarRecepcion from "../../components/NavbarRecepcion";
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';


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