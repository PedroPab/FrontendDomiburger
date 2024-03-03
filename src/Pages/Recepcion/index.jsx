import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container, ToastContainer } from 'react-bootstrap';
import { NavbarRecepcion } from '../../components/Navbar/NavbarRecepcion';
import RowListCol from "../../components/RowListCol";
import Layout from "../../components/Layout";
import { ColsPedidos } from '../../components/ColsPedidos';
import { ContextProviderRecepcion } from '../../Context/RecepcionContex';
import SelectListDomiciliarios from '../../components/SelectListDomiciliarios';

const Recepcion = () => {
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
            <RowListCol >
              <ColsPedidos
                pedidos={context.items ? context.items : []}
              />
            </RowListCol>
          </Container>
          <ToastContainer />
          <SelectListDomiciliarios />
        </ContextProviderRecepcion>

      </Layout >
    </>
  );

};

export default Recepcion;
