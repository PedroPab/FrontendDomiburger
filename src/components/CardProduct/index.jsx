import { Card, Button, Image, Badge, Container } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CardProduct = ({ img, count, incrementCount, decrementCount, title, description, isNew = false }) => {
  return (
    <Card className="border-0 shadow-lg p-4 rounded-4 h-100 d-flex flex-column justify-content-between">
      {/* Badge "NUEVO" más elegante */}
      {isNew && (
        <Badge bg="success" className="position-absolute top-0 start-0 m-3 rounded-pill px-3 py-1 fs-6 shadow">
          NUEVO
        </Badge>
      )}

      <Card.Body className="d-flex flex-column align-items-center text-center">
        {/* Imagen del producto con efecto hover */}
        <Image
          src={img}
          alt={title}
          roundedCircle
          className="shadow-lg border border-2 border-white"
          style={{
            width: '10rem',
            height: '10rem',
            objectFit: 'cover',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
          }}
          onClick={incrementCount}
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        />

        {/* Separador visual */}
        <div className="my-3 w-75 border-bottom border-2 border-primary opacity-50"></div>

        {/* Título y descripción estilizados */}
        <h5 className="fw-bold">{title}</h5>
        <p className="text-muted small">{description}</p>
      </Card.Body>

      {/* Controles de cantidad estilizados */}
      <Container className="d-flex justify-content-center align-items-center gap-3 pb-3">
        <Button
          variant="danger"
          className="rounded-circle shadow"
          style={{
            width: '45px',
            height: '45px',
            transition: 'all 0.2s ease-in-out',
          }}
          onClick={decrementCount}
          disabled={count === 0}
          aria-label="Disminuir cantidad"
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
          <FaMinus />
        </Button>

        <span className="fw-bold fs-4 text-dark">{count}</span>

        <Button
          variant="success"
          className="rounded-circle shadow"
          style={{
            width: '45px',
            height: '45px',
            transition: 'all 0.2s ease-in-out',
          }}
          onClick={incrementCount}
          aria-label="Aumentar cantidad"
          onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
          onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
        >
          <FaPlus />
        </Button>
      </Container>
    </Card>
  );
};

export default CardProduct;
