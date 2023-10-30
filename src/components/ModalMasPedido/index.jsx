import { Modal, Button } from 'react-bootstrap';
import { EstadoPago } from '../EstadoPago';
import MetodoDePago from '../MetodoDePago';
import BotonEliminarPedido from '../BotonEliminarPedido';
import BotonMasInformacionPedido from '../BotonMasInformacionPedido';
import CambiarMetodoPago from '../CambiarMetodoPago';
import BotonConfirmarPagoPedido from '../BotonConfirmarPagoPedido';

const ModalMasPedido = ({ show, handleClose, data }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mas...</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <EstadoPago pagado={data.pagoConfirmado.confirmado} />
        <MetodoDePago metodo={data.fee} />
        <BotonEliminarPedido data={data} />
        <BotonMasInformacionPedido data={data} />
        <CambiarMetodoPago data={data} />
        <BotonConfirmarPagoPedido data={data} />

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
