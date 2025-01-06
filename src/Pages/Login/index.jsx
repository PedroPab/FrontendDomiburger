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
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Ingresa tu usuario, contraseña y rol" />

        {/* Open Graph / Facebook Meta Tags */}
        {/* <meta property="og:url" content="https://tu-sitio-web.com/mi-pagina" /> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="App Domiburguer Login" />
        <meta property="og:description" content="Ingresa tu usuario, contraseña y rol" />
        <meta property="og:image" content={imagenLogin} />

      </Helmet>
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
