import { Container, Button } from 'react-bootstrap';
import Chat from '../../components/Chat';

const NotFoundPage = () => {
  return (
    <Container className="text-center mt-5">
      <h1>¡Oops!</h1>
      <h2>Parece que esta página se ha perdido en el espacio...</h2>
      <img
        src="https://example.com/your-404-image.png" // Reemplaza con la URL de tu imagen divertida
        alt="Perdido en el espacio"
        className="img-fluid my-4"
      />
      <p>Te recomendamos no esperar a que los extraterrestres te traigan de vuelta. ¡Mejor intenta con otra página!</p>
      <Button href="/" variant="primary">Regresar a Casa</Button>
      <Chat />
    </Container>
  );
};

export default NotFoundPage;
