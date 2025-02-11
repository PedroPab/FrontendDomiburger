import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Col, Container, Row } from 'react-bootstrap';
import OrderCard from '../../components/OrderCard';
import { FaBoxOpen } from 'react-icons/fa';
import LayoutCocina from '../../Layout/LayoutCocina';


const Cocina = () => {
  const context = useContext(MiContexto)

  const ListPedidos = () => {

    if (!context.items) return (<></>)

    if (context.items.length <= 0) {
      return (
        <Container fluid
          style={{ height: '90vh' }}
          className="d-flex align-items-center justify-content-center">
          <Row>
            <Col className="text-center">
              <FaBoxOpen size={50} />
              <h3>Sin pedidos</h3>
            </Col>
          </Row>
        </Container>
      )
    }

    return (
      context.items.map((pedido) => (
        <div
          className=' col-md-4 col-lg-4'
          key={pedido.id}
        >
          <div
            className="d-flex "
          >
            <OrderCard
              dataPedido={pedido}
            />
          </div>
        </div>
      ))
    )
  }



  return (
    <>
      <LayoutCocina>
        <Container fluid  >
          <Row>
            <ListPedidos />
          </Row>
        </Container>
      </LayoutCocina>
    </>
  );
};

export default Cocina;
