import { Modal, Button } from 'react-bootstrap';

const ModalAsignarPedido = ({ show, handleClose, idDomiciliario, nameDomiciliario }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Asignar a un domiciliario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Domiciliario actual: <span>{nameDomiciliario}</span> </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { ModalAsignarPedido };
