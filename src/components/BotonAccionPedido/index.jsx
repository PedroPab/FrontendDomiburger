import { Button, ButtonGroup } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { MiContexto } from '../../Context'

import { traladarPedidoDeEstado } from './../../Utils/utilsApi'
import { listaEstados } from '../../Utils/listEstados';
import { agregarAlerta, retirarAlerta } from '../../Utils/alert';
import { makeid } from '../../Utils/makeId';


const BotonAccionPedido = ({ dataPedido }) => {
  const context = useContext(MiContexto)

  //miramos cual es el la accion que se va ha hacer 
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const activarAccion = () => {
    handleToggle()
    //ejecutamos la accion  del boton 
    console.log(`el pedido ejecuta la funcion para el estado del id ${dataPedido.id} con el estado ${dataPedido.estado}`);
    switchaFunctionMoviEstate({ id: dataPedido.id, estado: dataPedido.estado }, context)


  }
  return (
    <>
      {isVisible ? (
        <Button size="" variant="outline-success" onClick={handleToggle} >
          {eventoBtn(dataPedido.estado)}
        </Button>
      ) : (
        <ButtonGroup vertical>
          <Button size="" variant="outline-success" onClick={activarAccion}>Confirmar</Button>
          <Button size="" variant="outline-danger" onClick={handleToggle}>Cancelar</Button>
        </ButtonGroup>
      )}
    </>
  );
}

function switchaFunctionMoviEstate({ id, estado }, context) {

  // por motivos de las desiciones del disenador de la api (yo) se ponen  el esto al que se va  a poner , y en minusculas , proximo a coreeccion
  const estadoAEnviar = listaEstados[listaEstados.findIndex(e => e.name == estado) + 1].name
  //ejecutamos el trapaso
  traladarPedidoDeEstado({ id, estado: estadoAEnviar })
    .then(data => { console.log(`la data del botonn `, data); return data })
    .then(data => {
      //remplazamos el pedido de nuetra lista de pedidos
      const pedidoIndex = context.items.findIndex(pedido => pedido.id == data.id)
      console.log("🚀 ~ file: index.jsx:54 ~ switchaFunctionMoviEstate ~ context:", context.items)
      console.log("🚀 ~ file: index.jsx:54 ~ switchaFunctionMoviEstate ~ pedidoIndex:", pedidoIndex)

      if (!pedidoIndex || pedidoIndex < 0) {
        console.log(`ocurrio un error , no esta el pediod en la lista`);
      }
      const newItems = [...context.items]
      newItems[pedidoIndex] = { data: data, ref: undefined }

      context.setItems(newItems)
    })
    .catch((error) => {
      console.log("🚀 ~ file: index.jsx:67 ~ switchaFunctionMoviEstate ~ error:", error)
      //agregamos un aleta al estado de alerta y en 5s lo quitamos 
      const newAlert = {
        type: 'danger',
        message: error.message,
        id: makeid(5),
      }
      agregarAlerta({ itemsAlerts: context.alerts, setItesmAlert: context.setAlerts, newAlert })
      setTimeout(() => {
        retirarAlerta({ itemsAlerts: context.alerts, setItesmAlert: context.setAlerts, newAlert })

      }, 3000)
    })

  return
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