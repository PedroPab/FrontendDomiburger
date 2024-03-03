import { useContext } from 'react';

import { MiContexto } from '../../Context';
import LayoudCliente from '../../Layout/LayoutCliente';
import FormContainer from './FormContainer';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';


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