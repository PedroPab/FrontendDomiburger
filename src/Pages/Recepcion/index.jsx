import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Col, Container } from 'react-bootstrap';
import NavbarRecepcion from "../../components/NavbarRecepcion";
import RowListCol from "../../components/RowListCol";
import Layout from "../../components/Layout";
import './style.css'

const Recepcion = () => {

  const context = useContext(MiContexto)


  return (
    <>
      <Layout>
        <NavbarRecepcion
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />

        <Container fluid >


          <RowListCol >

            <Col sm={3}>Columna 1</Col>
            <Col sm={3}>Columna 2</Col>
            <Col sm={3}>Columna 3</Col>
            <Col sm={3}>Columna 4</Col>
            <Col sm={3}>Columna 5</Col>
            <Col sm={3}>Columna 6</Col>
            <Col sm={3}>Columna 7</Col>
            <Col sm={3}>Columna 8</Col>
          </RowListCol>


        </Container>
      </Layout >
    </>
  );

};

export default Recepcion;
