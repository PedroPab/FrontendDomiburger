import { Button } from 'react-bootstrap';
import { getUrlBackend } from '../../../../../../Utils/getUrlApiByOriginPath';

const BotonMasInformacionPedido = ({ idOrder }) => {
  const apiUrl = getUrlBackend();

  const urlInfoPedido = `${apiUrl}/api/pedidos/id/?id=${idOrder}`

  return (
    <div>
      <a href={urlInfoPedido} target="blank">
        <Button variant='info'>Mas informacion</Button>
      </a>
    </div>
  );
};

export default BotonMasInformacionPedido;
