import { useContext } from 'react';

import NavbarCliente from "../../components/NavbarCliente";
import { MiContexto } from '../../Context';
import LayoudCliente from '../../Layout/LayoutCliente';
import FormContainer from './FormContainer';


const FormClient = () => {
  const context = useContext(MiContexto)


  return (
    <>
      <LayoudCliente>

        <NavbarCliente
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />
        <FormContainer />

      </LayoudCliente>
    </>
  )
}

export default FormClient