import { useContext } from 'react';
import { MiContexto } from '../../Context';
import { Container, ToastContainer, Row, Col } from 'react-bootstrap';
import RowListCol from "../../components/RowListCol";
import { ColsPedidos } from '../../components/ColsPedidos';
import SelectListDomiciliarios from '../../components/SelectListDomiciliarios';
import LayoutRecepcion from '../../Layout/Recepcion';
import Sidebar from '../../components/Sidebar';

const Recepcion = () => {
  const context = useContext(MiContexto);

  return (
    <>
      <LayoutRecepcion>
        <Container fluid>
          <Row>
            <Sidebar />
            <Col xs={9} md={10}>
              {/* El orden de las columnas es de derecha a izquierda */}
              <RowListCol>
                <ColsPedidos pedidos={context.items ? context.items : []} />
              </RowListCol>
            </Col>
          </Row>
        </Container>

        <ToastContainer />
        <SelectListDomiciliarios />
      </LayoutRecepcion>
    </>
  );
};

export default Recepcion;
