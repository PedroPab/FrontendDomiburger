import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container, Row, ToastContainer } from 'react-bootstrap';
import RowListCol from "../../components/RowListCol";
import { ColsPedidos } from '../../components/ColsPedidos';
import SelectListDomiciliarios from '../../components/SelectListDomiciliarios';
import LayoutRecepcion from '../../Layout/Recepcion';
import { BarraLateral } from '../../components/BarraLateral';

const Recepcion = () => {
  const context = useContext(MiContexto)

  return (
    <>
      <LayoutRecepcion>

        <Container fluid>
          {/* el orden de las columnas es de derecha a izquierda */}
          <Row className='d-flex align-items-end flex-column'>
            <div className='col-10'>
              <RowListCol >
                <ColsPedidos
                  pedidos={context.items ? context.items : []}
                />
              </RowListCol>
            </div>
            <div>
              <BarraLateral
                modoOscuro={context.modoOscuro}
              />
            </div>

          </Row>



        </Container>

        <ToastContainer />
        <SelectListDomiciliarios />


      </LayoutRecepcion >
    </>
  );

};

export default Recepcion;
