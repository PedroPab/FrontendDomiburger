import { ButtonGroup } from 'react-bootstrap';
import { BotonDomiciliario } from '../BotonAsignarDomiciliario';
import { BotonMasModal } from '../BotonMasModal';
import { BotonAccionPedido } from '../BotonAccionPedido';
import { ROLES } from '../../Utils/constList';

const ListButtonModalPedido = ({ dataPedido, role }) => {
  return (
    <>
      <div>
        <ButtonGroup aria-label="Basic example"
          className='d-flex justify-content-between '>
          <BotonMasModal dataPedido={dataPedido} />
          {
            (role == ROLES.admin || role == ROLES.recepcion) &&
            (
              <BotonDomiciliario
                nameDomiciliario={dataPedido?.domiciliario_asignado?.name || 'Sin Asignar'}
                idDomiciliario={dataPedido?.domiciliario_asignado?.id || undefined}
                idPedido={dataPedido.id}
              />)

          }

          <BotonAccionPedido dataPedido={dataPedido} />

        </ButtonGroup>
      </div >
    </>
  );
};

export { ListButtonModalPedido };
