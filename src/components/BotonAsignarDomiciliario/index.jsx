import { Button } from 'react-bootstrap';
import { ModalAsignarPedido } from '../ModalAsignarPedido';
import React from 'react';

1
const BotonDomiciliario = ({ idDomiciliario, nameDomiciliario, idPedido }) => {
  //miramos cual es el nombre del domciliaor con el id

  const [showModalAsignarDomiciliario, setShowModalAsignarDomiciliario] = React.useState(false);

  const handleShowModalAsignarDomiciliario = () => setShowModalAsignarDomiciliario(true);
  const handleCloseModalAsignarDomiciliario = () => setShowModalAsignarDomiciliario(false);

  return (
    <>
      <Button size="" variant="outline-warning" onClick={handleShowModalAsignarDomiciliario}>{nameDomiciliario}</Button>

      <ModalAsignarPedido
        show={showModalAsignarDomiciliario}
        handleClose={handleCloseModalAsignarDomiciliario}
        idDomiciliario={idDomiciliario}
        nameDomiciliario={nameDomiciliario}
        idPedido={idPedido}
        data={{}}
      />
    </>
  )
}

export { BotonDomiciliario }