import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container, Row } from 'react-bootstrap';
import NavbarRecepcion from "../../components/NavbarRecepcion";
import TablaListaPedidos from "../../components/TablaListaPedidos";
import Layout from "../../components/Layout";
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';

//para mostra los pedidos en una tabla y tener las estadistica a la mano 
const Contabilidad = () => {
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
            <Row className='m-5' >formuarios</Row>
            <Row className='m-5' >
              <TablaListaPedidos
                pedidos={context.items}
              />


            </Row>
          </Container >
        </ContextProviderRecepcion >

      </Layout>
    </>
  )
}

export default Contabilidad