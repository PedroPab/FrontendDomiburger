import { Modal, Button } from 'react-bootstrap';

const ModalDetallesCodigo = ({ data, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Código</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>ID: {data.id}</h5>
        <h5>Teléfono del Cliente: {data.phoneClient}</h5>
        <h5>Id del cliente: {data.clientId}</h5>
        <h5>Activo: {data.active ? 'Sí' : 'No'}</h5>
        <h5>Tipo: {data.type}</h5>
        <h5>Fecha de creación: {data.date}</h5>
        {/* cantidad de usadas */}
        <h5>Usadas: {data.used.length}</h5>
        <h5>Premios: {data.reward.length}</h5>
        <h5>Productos de Recompensa:</h5>
        {data.productsReward.map((product, index) => (
          <div key={index}>
            <p>Nombre: {product.name}</p>
            <p>Descripción: {product.description}</p>
            {/* <img src={product.imagen} alt={product.name} /> */}
          </div>
        ))}
        <h5>Productos:</h5>
        {data.products.map((product, index) => (
          <div key={index}>
            <p>Nombre: {product.name}</p>
            <p>Descripción: {product.description}</p>
            {/* <img src={product.imagen} alt={product.name} /> */}
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallesCodigo;