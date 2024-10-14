import { useContext } from 'react';

import { MiContexto } from '../../Context';
import LayoutCliente from '../../Layout/LayoutCliente';
import FormContainer from './FormContainer';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';


const FormClient = () => {
  const context = useContext(MiContexto)


  return (
    <>
      <LayoutCliente>

        <NavbarCliente
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />
        <FormContainer />

      </LayoutCliente>
    </>
  )
}

export default FormClient