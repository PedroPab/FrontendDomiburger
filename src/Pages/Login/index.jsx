import { useState } from 'react'
import { ContextProvider } from '../../Context'
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap'
import Layout from "../../components/Layout";
import FormLogin from '../../components/FormLogin';

const Login = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Layout>
        {/* <NavbarRecepcion
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        /> */}
        <Container className="login-container">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="login-card mt-3">
                <Card.Header className="text-center">
                  <h2>Iniciar Sesión</h2>
                </Card.Header>
                <Card.Body>
                  <FormLogin />
                </Card.Body>
                <Card.Footer className="text-center">
                  <a href="#" onClick={handleShowModal}>¿No tienes una cuenta? Regístrate</a>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body>No hay manera de registrarse, habla con el administrador.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Layout>
    </>
  );
};

const LoginC = () => {
  return (
    <ContextProvider>
      <Login />
    </ContextProvider>
  )
}

export default LoginC;
