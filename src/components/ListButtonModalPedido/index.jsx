import { Button, ButtonGroup } from 'react-bootstrap';
import { BotonDomiciliario } from '../BotonAsignarDomiciliario';
import { BotonMasModal } from '../BotonMasModal';
import { BotonAccionPedido } from '../BotonAccionPedido';
import React from 'react';

const ListButtonModalPedido = ({ dataPedido }) => {

  return (
    <>
      <div>
        <ButtonGroup aria-label="Basic example">
          <BotonMasModal dataPedido={dataPedido} />
          <BotonDomiciliario
            nameDomiciliario={dataPedido?.domiciliario_asignado?.name || 'Sin Asignar'} />
          <BotonAccionPedido dataPedido={dataPedido} />

        </ButtonGroup>
      </div >
    </>
  );
};

export { ListButtonModalPedido };
