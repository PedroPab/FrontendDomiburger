import { Modal, Button, Carousel, Card, Row, Col, ListGroup, Badge } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa'; // Icono de candado

const formatDate = (timestamp) => {
  if (!timestamp?._seconds) return 'No disponible';
  return new Date(timestamp._seconds * 1000).toLocaleDateString();
};

const ProductDetailsModal = ({ show, handleClose, product, handleEdit }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{product.name || 'Producto sin nombre'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Columna de imágenes */}
          <Col md={6} className="mb-3 position-relative">
            <Carousel>
              <Carousel.Item>
                <img
                  // src={product.imagen || 'https://picsum.photos/400/300'}
                  src={'https://picsum.photos/400/300'}
                  className="d-block w-100 rounded"
                  alt={product.name}
                  style={{ maxHeight: '400px', objectFit: 'cover', filter: product.secret ? 'brightness(50%)' : 'none' }}
                />
              </Carousel.Item>
            </Carousel>

            {/* Si es un producto secreto, colocar candado en la imagen */}
            {product.secret && (
              <div className="position-absolute top-50 start-50 translate-middle text-white">
                <FaLock size={50} className="opacity-75" />
              </div>
            )}
          </Col>

          {/* Columna de detalles */}
          <Col md={6}>
            <Card className="shadow border-0 p-3" >
              <Card.Body>
                {/* Badge si el producto es secreto */}
                {product.secret && (
                  <Badge bg="danger" className="mb-2 w-100 text-center py-2">
                    <FaLock className="me-1" /> Producto Secreto
                  </Badge>
                )}

                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong className="text-primary">Tipo:</strong> {product.type || 'No especificado'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong className="text-primary">Precio:</strong>
                    <span className="fs-5 fw-bold text-success ms-2">${product.price?.toLocaleString() || 'No disponible'}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong className="text-primary">Descripción:</strong>
                    <span className="text-muted mb-0">{product.description || 'Sin descripción'}</span>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong className="text-primary">Fecha de Creación:</strong> {formatDate(product.dataCreate)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong className="text-primary">Última Actualización:</strong> {formatDate(product.dataUpdate)}
                  </ListGroup.Item>
                </ListGroup>

                {/* Muestras de colores */}
                <div className="mt-3">
                  <strong className="text-primary">Colores del Producto:</strong>
                  <div className="d-flex align-items-center gap-3 mt-2">
                    <div
                      className="border rounded-circle"
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: product.colorPrimary || '#ddd',
                        border: '1px solid #000'
                      }}
                      title={`Color Primario: ${product.colorPrimary}`}
                    ></div>
                    <div
                      className="border rounded-circle"
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: product.colorSecondary || '#ddd',
                        border: '1px solid #000'
                      }}
                      title={`Color Secundario: ${product.colorSecondary}`}
                    ></div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
