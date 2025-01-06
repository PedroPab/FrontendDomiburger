import { useContext } from 'react';
import { MiContexto } from '../../Context';
import LayoutCliente from '../../Layout/LayoutCliente';
import FormContainer from './FormContainer';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import { HelmetClientHome } from './HelmetClientHome';

const FormClient = () => {
  const context = useContext(MiContexto);

  return (
    <>
      <LayoutCliente>
        <HelmetClientHome />

        <NavbarCliente
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />

        <FormContainer />
      </LayoutCliente>
    </>
  );
};

export default FormClient;
