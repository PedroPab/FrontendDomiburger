import { Modal, Button } from 'react-bootstrap';

const ModalAsignarPedido = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ejemplo de Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Contenido del modal...
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
