import { useContext } from 'react';

import NavbarCliente from "../../components/NavbarCliente";
import { MiContexto } from '../../Context';


const FormClient = () => {
  const context = useContext(MiContexto)

  return (
    <>
      <NavbarCliente
        modoOscuro={context.modoOscuro}
        alternarModo={context.alternarModo}
      />


    </>
  )
}

export default FormClient