import { Button } from 'react-bootstrap';
import { ModalAsignarPedido } from '../ModalAsignarPedido';
import React from 'react';

1
const BotonDomiciliario = ({ idDomiciliario, nameDomiciliario }) => {
  //miramos cual es el nombre del domciliaor con el id

  const [showModalAsignarDomiciliario, setShowModalAsignarDomiciliario] = React.useState(false);

  const handleShowModalAsignarDomiciliario = () => setShowModalAsignarDomiciliario(true);
  const handleCloseModalAsignarDomiciliario = () => setShowModalAsignarDomiciliario(false);

  return (
    <>
      <Button size="" variant="outline-success" onClick={handleShowModalAsignarDomiciliario}>{nameDomiciliario}</Button>

      <ModalAsignarPedido
        show={showModalAsignarDomiciliario}
        handleClose={handleCloseModalAsignarDomiciliario}
        data={{}}
      />
    </>
  )
}

export { BotonDomiciliario }