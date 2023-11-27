import { Modal, Button, Row } from 'react-bootstrap';
import { EstadoPago } from '../EstadoPago';
import MetodoDePago from '../MetodoDePago';
import BotonEliminarPedido from '../BotonEliminarPedido';
import BotonMasInformacionPedido from '../BotonMasInformacionPedido';
import CambiarMetodoPago from '../CambiarMetodoPago';
import BotonConfirmarPagoPedido from '../BotonConfirmarPagoPedido';
import GraficoTimeline from '../GraficoTimeline';

const ModalMasPedido = ({ show, handleClose, data }) => {
  const eventos = [
    { id: 1, nombre: 'Evento 1', fechaInicio: '2021-01-01', fechaFin: '2021-01-02' },
    { id: 2, nombre: 'Evento 2', fechaInicio: '2021-01-03', fechaFin: '2021-01-05' },
    // Más eventos...
  ];

  const datosGrafico = eventos.map(evento => {
    const inicio = new Date(evento.fechaInicio).getTime();
    const fin = new Date(evento.fechaFin).getTime();
    const duracion = (fin - inicio) / (1000 * 3600 * 24); // Duración en días
    return { x: evento.nombre, y: duracion };
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mas... {data.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Row className='m-3 '>
          <GraficoTimeline datos={datosGrafico} />

        </Row>

        <Row className='m-3 '>
          <EstadoPago pagado={data.pagoConfirmado.confirmado} />
          <MetodoDePago metodo={data.fee} />
        </Row>
        <Row className='m-3 '>
          <BotonEliminarPedido data={data} handleClose={handleClose} />
        </Row>
        <Row className='m-3 '>
          <BotonMasInformacionPedido data={data} handleClose={handleClose} />
        </Row>
        <Row className='m-3 '>
          <CambiarMetodoPago data={data} handleClose={handleClose} />
        </Row>
        <Row className='m-3 '>
          <BotonConfirmarPagoPedido data={data} handleClose={handleClose} />
        </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal >
  );
};




export { ModalMasPedido };
