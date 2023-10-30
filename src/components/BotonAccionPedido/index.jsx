import { Button, ButtonGroup } from 'react-bootstrap';
import React, { useState } from 'react';


const BotonAccionPedido = ({ dataPedido }) => {
  //miramos cual es el la accion que se va ha hacer 
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const activarAccion = () => {
    handleToggle()
    //ejecutamos la accion  del boton 
    console.log(`el pedido ejecuta la funcion para el estado del id ${dataPedido.id} con el estado ${dataPedido.estado}`);
  }
  return (
    <>
      {isVisible ? (
        <Button size="" variant="outline-secondary" onClick={handleToggle} >
          {eventoBtn(dataPedido.estado)}
        </Button>
      ) : (
        <ButtonGroup vertical>
          <Button size="" variant="outline-secondary" onClick={activarAccion}>Confirmar</Button>
          <Button size="" variant="outline-secondary" onClick={handleToggle}>Cancelar</Button>
        </ButtonGroup>
      )}
    </>
  );
}

function switchaFunctionMoviEstate(estado, id) {
  let rta

  switch (estado) {
    case 'PendienteConfimacion':
      rta = PendienteConfimacion(id)

      break;
    case 'Calientes':
    case 'Caliente':
      rta = preparar(id)

      break;
    case 'Preparando':
      rta = espera(id)

      break;
    case 'Espera':
      rta = despachar(id)

      break;
    case 'Despachados':
      rta = entregado(id)

      break;
    case 'Entregados':
      rta = facturado(id)

      break;
    case 'PendieteTransferencia':
      rta = facturado(id)

      break;

    default:
      break;
  }
  return rta

}


function eventoBtn(estado) {
  const listEventoSiguiete = {
    PendienteConfimacion: `A calientes`,
    Calientes: `Preparando`,
    Preparando: `A Espera`,
    Espera: `Despachar`,
    Despachados: `Entregado`,
    Entregados: `Facturar`,
    PendieteTransferencia: `Facturar`,
  }
  return listEventoSiguiete[estado]
}

export { BotonAccionPedido }