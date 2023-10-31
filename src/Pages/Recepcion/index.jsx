import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container } from 'react-bootstrap';
import NavbarRecepcion from "../../components/NavbarRecepcion";
import RowListCol from "../../components/RowListCol";
import Layout from "../../components/Layout";
import './style.css'
import { ColsPedidos } from '../../components/ColsPedidos';

const Recepcion = () => {
  const context = useContext(MiContexto)

  return (
    <>
      <Layout>
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
      </Layout >
    </>
  );

};

export default Recepcion;
