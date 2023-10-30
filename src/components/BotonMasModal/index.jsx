import { Button } from 'react-bootstrap';

import { ModalMasPedido } from '../ModalMasPedido';
import React from 'react';

const BotonMasModal = ({ dataPedido }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <Button size="" variant="outline-secondary" onClick={handleShowModal}>Mas</Button>

      <ModalMasPedido
        show={showModal}
        handleClose={handleCloseModal}
        data={dataPedido}
      />
    </>


  )
}

export { BotonMasModal }