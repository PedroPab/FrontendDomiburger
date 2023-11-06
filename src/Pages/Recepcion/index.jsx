import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container } from 'react-bootstrap';
import NavbarRecepcion from "../../components/NavbarRecepcion";
import RowListCol from "../../components/RowListCol";
import Layout from "../../components/Layout";
import './style.css'
import { ColsPedidos } from '../../components/ColsPedidos';
import { ErrorAlert } from "../../components/ErrorAlert"

const Recepcion = () => {
  const context = useContext(MiContexto)
  console.log("🚀 ~ file: index.jsx:13 ~ Recepcion ~ context:", context)

  if (context.tokenLogin) {
    // console.log(`tokenLogin`, context.tokenLogin);
  }

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
        <ErrorAlert />

      </Layout >
    </>
  );

};

export default Recepcion;
