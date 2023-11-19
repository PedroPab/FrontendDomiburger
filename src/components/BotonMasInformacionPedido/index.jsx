import { Button } from 'react-bootstrap';
const ENV = import.meta.env

const BotonMasInformacionPedido = ({ data }) => {
  const urlInfoPedido = `${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}/api/pedidos/id/?id=${data.id}`

  return (
    <div>
      <a href={urlInfoPedido} target="blank">
        <Button variant='info'>Mas informacion</Button>
      </a>
    </div>
  );
};

export default BotonMasInformacionPedido;
