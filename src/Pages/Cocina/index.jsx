import { useContext } from 'react'
import { MiContexto } from '../../Context'
import NavbarCocinero from "../../components/NavbarCocinero";
import Layout from "../../components/Layout";
import { Container, Row } from 'react-bootstrap';
import OrderCard from '../../components/OrderCard';


const Cocina = () => {
  const context = useContext(MiContexto)

  return (
    <>
      <Layout>
        <NavbarCocinero
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
          pedidos={context.items}
        />
        <Container fluid  >

          <Row className=''>
            {
              context.items ?
                context.items.map((pedido) => (
                  <div
                    className=' col-md-4 col-lg-4'
                    key={pedido.data.id}
                  >
                    <div
                      className="d-flex "
                    >
                      <OrderCard
                        dataPedido={pedido.data}
                      />
                    </div>
                  </div>
                )) :
                <></>
            }

          </Row>
        </Container>
      </Layout >
    </>
  );
};

export default Cocina;
