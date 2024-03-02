import { useContext, } from 'react'
import { MiContexto } from '../../Context'
import { Container } from 'react-bootstrap';
import NavbarRecepcion from "../../components/NavbarRecepcion";
import Layout from "../../components/Layout";
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import ListaBotonesLink from '../../components/ListaBotonesLink';

const Codigos = () => {

  const context = useContext(MiContexto)

  return (
    <>
      <Layout>
        <ContextProviderRecepcion>

          <NavbarRecepcion
            modoOscuro={context.modoOscuro}
            alternarModo={context.alternarModo}
          />


          <Container fluid  >

            <ListaBotonesLink
              lista={[
                { nombre: 'Crear Codigo Referido', path: 'crearCodigoReferido' },
                { nombre: 'Crear codigo ya creado', path: 'crearCodigoYaCreado' },
                // { nombre: 'Clientes', path: 'clientes' },
              ]}
            />
          </Container>


        </ContextProviderRecepcion>

      </Layout >
    </>
  );

}

export default Codigos