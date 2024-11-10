import { Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navega directamente a la página de inicio (raíz)
  };

  return (
    <Container className="d-flex flex-column align-items-center text-center mt-5">
      <h1 className="display-3 fw-bold mb-3">404!</h1>
      <h2 className="h4 text-secondary">Parece que esta página se ha perdido en el espacio...</h2>

      <Image
        src="https://i.pinimg.com/736x/7a/d9/45/7ad945f9fbfe4b558a707af6e1f444f9.jpg" // Reemplaza con la URL de tu imagen divertida
        alt="Perdido en el espacio"
        className="img-fluid my-4 rounded-circle"
        style={{ maxWidth: '300px' }}
      />

      <p className="text-muted mb-4">
        Te recomendamos no esperar a que los extraterrestres te traigan de vuelta.
        <br />
        ¡Mejor intenta con otra página!
      </p>

      <Button onClick={handleGoHome} variant="primary" size="lg" className="px-4 py-2">
        Regresar a Inicio
      </Button>
    </Container>
  );
};

export default NotFoundPage;
