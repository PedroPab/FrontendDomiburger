import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container, ToastContainer } from 'react-bootstrap';
import RowListCol from "../../components/RowListCol";
import { ColsPedidos } from '../../components/ColsPedidos';
import SelectListDomiciliarios from '../../components/SelectListDomiciliarios';
import LayoutRecepcion from '../../Layout/Recepcion';

const Recepcion = () => {
  const context = useContext(MiContexto)

  return (
    <>
      <LayoutRecepcion>

        <Container fluid>
          {/* el orden de las columnas es de derecha a izquierda */}
          <RowListCol >
            <ColsPedidos
              pedidos={context.items ? context.items : []}
            />
          </RowListCol>

          {/* <div>
              <BarraLateral
                modoOscuro={context.modoOscuro}
              />
            </div> */}




        </Container>

        <ToastContainer />
        <SelectListDomiciliarios />


      </LayoutRecepcion >
    </>
  );

};

export default Recepcion;
