import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container, ToastContainer } from 'react-bootstrap';
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

        <Container fluid
          //corremos 50px a la derecha
          className='ms-5'
          style={{ marginLeft: 50, }}
        >
          <RowListCol >
            <ColsPedidos
              pedidos={context.items ? context.items : []}
            />
          </RowListCol>
        </Container>
        <ToastContainer />
        <SelectListDomiciliarios />

        <BarraLateral />

      </LayoutRecepcion >
    </>
  );

};

export default Recepcion;
