import { Card, Button, Image } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CardProduct = ({ img, count, incrementCount, decrementCount, title, description }) => {
  return (
    <Card className="shadow-sm border-0" style={{ width: '100%', minHeight: '200px' }}>
      <Card.Body className="d-flex align-items-center justify-content-between p-3 flex-column">
        {/* Título y descripción del producto */}
        <div className="text-center mb-3">
          <h5>{title}</h5>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>{description}</p>
        </div>

        {/* Imagen del producto */}
        <Image
          src={img}
          alt={title}
          className="product-image"
          roundedCircle
          style={{
            width: '5rem',
            height: '5rem',
            objectFit: 'cover',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
          }}
          onClick={incrementCount}
        />

        {/* Control de cantidad */}
        <div className="d-flex align-items-center justify-content-between mt-3" style={{ width: '50%' }}>
          <Button
            variant="outline-danger"
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '45px', height: '45px' }}
            onClick={decrementCount}
            disabled={count === 0} // Deshabilitar cuando count es 0
          >
            <FaMinus />
          </Button>
          <span className="mx-3 font-weight-bold" style={{ fontSize: '1.2rem' }}>{count}</span>
          <Button
            variant="outline-success"
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '45px', height: '45px' }}
            onClick={incrementCount}
          >
            <FaPlus />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
