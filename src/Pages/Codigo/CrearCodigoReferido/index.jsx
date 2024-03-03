import { useContext, } from 'react'
import { MiContexto } from '../../../Context'
import Layout from "../../../components/Layout";
import { ContextProviderRecepcion } from '../../../Context/RecepcionContex';
import { default as CrearCodigoReferidoComponent } from '../../../components/Codigos/CrearCodigoReferido';
import { NavbarRecepcion } from '../../../components/Navbar/NavbarRecepcion';

const CrearCodigoReferido = () => {

  const context = useContext(MiContexto)
  const token = context.tokenLogin.token
  const userId = context.tokenLogin.user.id

  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />

          {/* crear codigo de referido */}
          <CrearCodigoReferidoComponent
            token={token}
            userId={userId}
          />



        </ContextProviderRecepcion>

      </Layout >
    </>
  );

}

export default CrearCodigoReferido