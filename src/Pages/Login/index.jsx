import { useContext } from 'react'
import { MiContexto } from '../../Context'
import { Container, Row, Card } from 'react-bootstrap'
import Layout from "../../components/Layout";
import FormLogin from '../../components/FormLogin';
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
