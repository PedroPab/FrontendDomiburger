import { Modal, Button, Row, Col } from 'react-bootstrap';
import EstadoPago from './EstadoPago';
import MetodoDePago from './MetodoDePago';
import BotonEliminarPedido from './BotonEliminarPedido';
import BotonMasInformacionPedido from './BotonMasInformacionPedido';
import CambiarMetodoPago from './CambiarMetodoPago';
import BotonConfirmarPagoPedido from './BotonConfirmarPagoPedido';

const ModalMasPedido = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Más... {data.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='m-3'>
          <Col>
            <EstadoPago pagado={data.pagoConfirmado.confirmado} />
          </Col>
          <Col>
            <MetodoDePago metodo={data.fee} />
          </Col>
        </Row>
        <Row className='m-3'>
          <Col>
            <BotonEliminarPedido data={data} handleClose={handleClose} />
          </Col>
        </Row>
        <Row className='m-3'>
          <Col>
            <BotonMasInformacionPedido data={data} handleClose={handleClose} />
          </Col>
        </Row>
        <Row className='m-3'>
          <Col>
            <CambiarMetodoPago data={data} handleClose={handleClose} />
          </Col>
        </Row>
        <Row className='m-3'>
          <Col>
            <BotonConfirmarPagoPedido data={data} handleClose={handleClose} />
          </Col>
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

export default ModalMasPedido;
