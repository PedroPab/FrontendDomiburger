import { Modal, Button, Row } from 'react-bootstrap';
import { EstadoPago } from './EstadoPago';
import MetodoDePago from './MetodoDePago';
import BotonEliminarPedido from './BotonEliminarPedido';
import BotonMasInformacionPedido from './BotonMasInformacionPedido';
import CambiarMetodoPago from './CambiarMetodoPago';
import BotonConfirmarPagoPedido from './BotonConfirmarPagoPedido';

const ModalMasPedido = ({ show, handleClose, data }) => {
  const idOrder = data.id
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mas... {data.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Row className='m-3 '>
          <EstadoPago pagado={data?.pagoConfirmado?.confirmado} />
          <MetodoDePago metodo={data.fee} />
        </Row>


        <Row className='m-3 '>
          <BotonEliminarPedido idOrder={idOrder} handleClose={handleClose} />
        </Row>
        <Row className='m-3 '>
          <BotonMasInformacionPedido idOrder={idOrder} handleClose={handleClose} />
        </Row>
        <Row className='m-3 '>
          <CambiarMetodoPago idOrder={idOrder} handleClose={handleClose} />
        </Row>
        <Row className='m-3 '>
          <BotonConfirmarPagoPedido idOrder={idOrder} handleClose={handleClose} />
        </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};




export { ModalMasPedido };
