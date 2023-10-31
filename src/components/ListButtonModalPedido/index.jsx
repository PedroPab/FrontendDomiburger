import { ButtonGroup } from 'react-bootstrap';
import { BotonDomiciliario } from '../BotonAsignarDomiciliario';
import { BotonMasModal } from '../BotonMasModal';
import { BotonAccionPedido } from '../BotonAccionPedido';

const ListButtonModalPedido = ({ dataPedido }) => {

  return (
    <>
      <div>
        <ButtonGroup aria-label="Basic example">
          <BotonMasModal dataPedido={dataPedido} />
          <BotonDomiciliario
            nameDomiciliario={dataPedido?.domiciliario_asignado?.name || 'Sin Asignar'}
            idDomiciliario={dataPedido?.domiciliario_asignado?.id || undefined}
          />
          <BotonAccionPedido dataPedido={dataPedido} />

        </ButtonGroup>
      </div >
    </>
  );
};

export { ListButtonModalPedido };
