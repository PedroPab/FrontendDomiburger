import { useAuth } from "../../Context/AuthContext"
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { UserLayout } from "../../Layout/UserLayout";

const MeProfile = () => {
  const { usuarioActual } = useAuth();
  console.log(`:P `, usuarioActual)

  // Si el usuario no está autenticado, mostramos un mensaje indicándolo.
  if (!usuarioActual) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <h2>No estás autenticado</h2>
            <p>Por favor inicia sesión para ver tu perfil.</p>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <UserLayout>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card>
              <Card.Header as="h5">Mi Perfil</Card.Header>
              <Card.Body className="text-center">
                {/* Muestra la foto del usuario o una imagen predeterminada */}
                {usuarioActual.photoURL ? (
                  <Image
                    src={usuarioActual.photoURL}
                    roundedCircle
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    alt="Foto de perfil"
                  />
                ) : (
                  <Image
                    src="https://via.placeholder.com/150" // Puedes reemplazar con una imagen predeterminada de tu elección
                    roundedCircle
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    alt="Foto de perfil predeterminada"
                  />
                )}
                {/* Muestra el nombre de usuario o, en su defecto, el email */}
                <Card.Title className="mt-3">
                  {usuarioActual.displayName || usuarioActual.email}
                </Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {usuarioActual.email}
                </Card.Text>
                <Card.Text>
                  <strong>ID de Usuario:</strong> {usuarioActual.uid}
                </Card.Text>
                <Button variant="primary">Editar Perfil</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </UserLayout>

  );
};

export { MeProfile };
