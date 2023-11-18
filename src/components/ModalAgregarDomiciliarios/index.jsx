/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { RecepcionContexto } from "../../Context/RecepcionContex";

const ModalAgregarDomiciliarios = ({ show, handleClose }) => {
  //la lista de los domiciliario que tenemo en local
  const { listDomiciliarios, setListDomiciliarios, users } = useContext(RecepcionContexto)

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
          <div>
            <h3>Seleccionar Usuarios:</h3>
            {
              users &&
              users.map(user => (
                <button key={user.id} onClick={() => handleSelectUser(user, user.id)}>
                  {user.name}
                </button>
              ))}
          </div>
          <div>
            <h3>Usuarios Seleccionados:</h3>
            {listDomiciliarios.map(user => (
              <div key={user.id}>
                {user.name} <button onClick={() => handleRemoveUser(user.id)}>Eliminar</button>
              </div>
            ))}
          </div>
        </div>
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
  )
}

export default ModalAgregarDomiciliarios