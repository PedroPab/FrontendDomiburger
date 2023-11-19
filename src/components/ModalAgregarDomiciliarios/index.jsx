import { useContext } from 'react';
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { RecepcionContexto } from "../../Context/RecepcionContex";

const ModalAgregarDomiciliarios = ({ show, handleClose }) => {
  const { listDomiciliarios, setListDomiciliarios, users } = useContext(RecepcionContexto);

  // Funciones handleSelectUser y handleRemoveUser permanecen iguales
  const handleSelectUser = (user, id) => {
    const find = listDomiciliarios.find(e => e.id == id)
    if (!find) {
      setListDomiciliarios([...listDomiciliarios, user]);
    }
  };

  const handleRemoveUser = (id) => {
    setListDomiciliarios(listDomiciliarios.filter(user => user.id !== id));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Domiciliarios en local</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3>Seleccionar Usuarios:</h3>
          <ListGroup>
            {users && users.map(user => {
              const yaSeleccionado = listDomiciliarios.find(e => e.id == user.id)
              if (!yaSeleccionado) {
                return (<ListGroupItem key={user.id} className="d-flex justify-content-between align-items-center">
                  {user.name}
                  <Button variant="danger" size="sm" onClick={() => handleSelectUser(user, user.id)}>
                    <FaTimes />
                  </Button>
                </ListGroupItem>)
              }
              return (
                <ListGroupItem key={user.id} className="d-flex justify-content-between align-items-center">
                  {user.name}
                  <Button variant="success" size="sm" onClick={() => handleRemoveUser(user.id)}>
                    <FaPlus />
                  </Button>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleClose}>Guardar Cambios</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAgregarDomiciliarios;
