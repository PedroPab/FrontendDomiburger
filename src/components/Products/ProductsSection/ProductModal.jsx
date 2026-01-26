import { Modal, Button, Carousel, ListGroup } from 'react-bootstrap';

const ProductModal = ({ show, handleClose, product }) => {
  if (!product) return null; // Si no hay producto, no renderizar el modal

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Carrusel de imágenes */}
        <Carousel>
          {product.images.map((img, index) => (
            <Carousel.Item key={index}>
              <img src={img} className="d-block w-100" alt={product.title} style={{ objectFit: 'cover', maxHeight: '400px' }} />
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Información del producto */}
        <div className="mt-4">
          <h5 className="fw-bold text-primary">Ingredientes</h5>
          <ListGroup variant="flush">
            {product.ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
            ))}
          </ListGroup>

          <h5 className="fw-bold text-primary mt-3">Precio</h5>
          <p className="fs-4 fw-bold text-success">${product.price.toFixed(2)}</p>

          <h5 className="fw-bold text-primary mt-3">Descripción</h5>
          <p className="text-muted">{product.detailedDescription}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
