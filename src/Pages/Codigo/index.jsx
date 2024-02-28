import { useContext, } from 'react'
import { MiContexto } from '../../Context'
import { Container } from 'react-bootstrap';
import NavbarRecepcion from "../../components/NavbarRecepcion";
import Layout from "../../components/Layout";
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import CrearCodigoReferido from '../../components/Codigos/CrearCodigoReferido';

const Codigos = () => {

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
          <CrearCodigoReferido
            token={token}
            userId={userId}
          />
          <Container fluid  >
            <h1>Codigos</h1>
          </Container>


        </ContextProviderRecepcion>

      </Layout >
    </>
  );

}

export default Codigos