import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import ProductDetailsModal from './ProductDetailsModal.jsx';

const ProductCard = ({ dataPedido, handleEdit }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = () => setShowModal(true);
  const handleCloseDetails = () => setShowModal(false);

  if (!dataPedido) return null;

  return (
    <>
      <Card
        className="shadow-lg border-0 rounded-4 h-100 d-flex flex-column justify-content-between"
        style={{ backgroundColor: dataPedido.colorPrimary, color: '#fff' }}
      >
        {/* Badge con el tipo de producto */}
        <Badge
          bg="dark"
          className="position-absolute top-0 start-0 m-2 rounded-pill px-3 py-1 fs-6 shadow"
        >
          {dataPedido.type}
        </Badge>

        <Card.Img
          variant="top"
          src={dataPedido.imagen}
          alt={dataPedido.name}
          style={{ height: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
        />

        <Card.Body className="text-center">
          <h5 className="fw-bold">{dataPedido.name}</h5>
          <p className="text-light small">{dataPedido.description}</p>

          {/* Precio */}
          <h4 className="fw-bold" style={{ color: dataPedido.colorSecondary }}>
            ${dataPedido.price.toLocaleString()}
          </h4>
        </Card.Body>

        <Card.Footer className="bg-transparent border-0 text-center">
          <Button
            variant="light"
            className="rounded-pill px-4 py-2 fw-bold shadow me-2"
            style={{ color: dataPedido.colorPrimary, border: `2px solid ${dataPedido.colorSecondary}` }}
            onClick={handleShowDetails}
          >
            Ver detalles
          </Button>
          <Button
            variant="warning"
            className="rounded-pill px-4 py-2 fw-bold shadow"
            onClick={() => handleEdit(dataPedido)}
          >
            Editar
          </Button>
        </Card.Footer>
      </Card>

      {/* Modal de detalles */}
      <ProductDetailsModal show={showModal} handleClose={handleCloseDetails} product={dataPedido} handleEdit={handleEdit} />
    </>
  );
};

export { ProductCard };
