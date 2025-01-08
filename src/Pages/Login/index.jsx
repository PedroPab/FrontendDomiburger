import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container, Row, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async';
import Layout from "../../components/Layout";
import FormLogin from '../../components/FormLogin';
import imagenLogin from './../../assets/img/catLoginDomi.png';
import { NavbarRecepcion } from '../../components/Navbar/NavbarRecepcion';



const Login = () => {
  const context = useContext(MiContexto)

  return (
    <>
      <Layout>

        <NavbarRecepcion
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />

        <Container >

          <Row>

            <Card className='mt-3'>
              <FormLogin />
            </Card>

          </Row>


        </Container>

      </Layout >
    </>
  );

};

export default Login;
