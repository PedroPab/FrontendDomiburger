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
        <Modal.Title>Mas... {data.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <EstadoPago pagado={data.pagoConfirmado.confirmado} />
        <MetodoDePago metodo={data.fee} />
        <BotonEliminarPedido data={data} handleClose={handleClose} />
        <BotonMasInformacionPedido data={data} handleClose={handleClose} />
        <CambiarMetodoPago data={data} handleClose={handleClose} />
        <BotonConfirmarPagoPedido data={data} handleClose={handleClose} />

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
