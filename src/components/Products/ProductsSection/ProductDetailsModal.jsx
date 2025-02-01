import React from 'react';
import { Modal, Button, Carousel, ListGroup, Badge, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaLock, FaTag, FaUtensils, FaComments } from 'react-icons/fa';

const ProductDetailsModal = ({ product, show, handleClose }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Sección de imágenes con carrusel */}
          <Col md={6} className="mb-3">
            <Carousel>
              {product.images && product.images.length > 0 ? (
                product.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img src={img} className="d-block w-100 rounded" alt={product.title} style={{ maxHeight: '350px', objectFit: 'cover' }} />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img src={product.img} className="d-block w-100 rounded" alt={product.title} style={{ maxHeight: '350px', objectFit: 'cover' }} />
                </Carousel.Item>
              )}
            </Carousel>
          </Col>

          {/* Sección de detalles */}
          <Col md={6}>
            <div className="shadow border-0 p-3">

              <ListGroup variant="flush">

                <ListGroup.Item>
                  <strong className="text-primary"></strong> {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong className="text-primary"></strong> {product.moreInfo || 'No hay detalles adicionales'}
                </ListGroup.Item>
                <ListGroup.Item className="fs-5 fw-bold text-success text-center">
                  💰 Precio: ${product.price?.toLocaleString() || 'No disponible'}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        </Row>

        {/* Sección de Ingredientes */}
        {product.ingredients && product.ingredients.length > 0 && (
          <Card className="mt-4 shadow border-0">
            <Card.Body>
              <h5 className="fw-bold text-primary">🍽 Ingredientes</h5>
              <ListGroup variant="flush">
                {product.ingredients.map((ingredient, index) => (
                  <ListGroup.Item key={index}>
                    <FaUtensils className="me-2 text-secondary" /> {ingredient}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        )}

        {/* Sección de Opiniones */}
        {product.reviews && product.reviews.length > 0 && (
          <Card className="mt-4 shadow border-0">
            <Card.Body>
              <h5 className="fw-bold text-primary"><FaComments className="me-2" /> Opiniones</h5>
              {product.reviews.map((review, index) => (
                <div key={index} className="mb-3">
                  <strong>{review.user}</strong>
                  <div className="text-warning">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p className="text-muted">{review.comment}</p>
                  <hr />
                </div>
              ))}
            </Card.Body>
          </Card>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailsModal;
