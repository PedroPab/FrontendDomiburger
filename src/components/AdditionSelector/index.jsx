import { useState, useEffect } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { CardProductResumid } from '../Products/CardProductResumid';

const AdditionSelector = ({ producto, adiciones, onChangeSelect }) => {
  const [show, setShow] = useState(false);
  const [filteredAdiciones, setFilteredAdiciones] = useState(adiciones);

  // Cada vez que abra el modal, reiniciamos el filtrado
  useEffect(() => {
    if (show) {
      setFilteredAdiciones(adiciones);
    }
  }, [show, adiciones]);

  const handleSelect = (additionItem) => {
    onChangeSelect(additionItem.id, producto.idInter);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Seleccionar Adición
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Elige una adición</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted text-center">
            Selecciona una adición para el producto <strong>{producto.name}</strong>
          </p>

          <input
            type="text"
            placeholder="Buscar adición..."
            className="form-control mb-3"
            onChange={(e) => {
              const q = e.target.value.toLowerCase().trim();
              setFilteredAdiciones(
                adiciones.filter((add) =>
                  add.name.toLowerCase().includes(q)
                )
              );
            }}
          />

          <Row>
            {filteredAdiciones.map((add) => (
              <Col key={add.id} xs={6} sm={6} md={4} className="mb-3">
                <CardProductResumid product={add} onClick={handleSelect} />
              </Col>
            ))}

            {filteredAdiciones.length === 0 && (
              <Col>
                <p className="text-center text-muted">No se encontraron adiciones.</p>
              </Col>
            )}
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};


export { AdditionSelector };
