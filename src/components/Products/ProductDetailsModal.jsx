import React from 'react';
import { Modal, Button, Carousel, ListGroup } from 'react-bootstrap';

const ProductDetailsModal = ({ show, handleClose, product, handleEdit }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Galería de imágenes */}
        <Carousel>
          <Carousel.Item>
            <img src={product.imagen} className="d-block w-100" alt={product.name} style={{ maxHeight: '400px', objectFit: 'cover' }} />
          </Carousel.Item>
        </Carousel>

        {/* Información del producto */}
        <div className="mt-4">
          <h5 className="fw-bold text-primary">Descripción</h5>
          <p className="text-muted">{product.description}</p>

          <h5 className="fw-bold text-primary">Tipo de Producto</h5>
          <p>{product.type}</p>

          <h5 className="fw-bold text-primary">Precio</h5>
          <p className="fs-4 fw-bold text-success">${product.price.toLocaleString()}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="warning" onClick={() => handleEdit(product)}>
          Editar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
