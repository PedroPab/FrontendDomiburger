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

  const objBotonEvent = eventoBtn(dataPedido.estado, context.tokenLogin.user.role)


  return (
    <>

      {isVisible ? (
        objBotonEvent.acceses ?
          <Button size="" variant="outline-success" onClick={handleToggle} >
            {objBotonEvent.view}
          </Button> :
          <></>
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
  traladarPedidoDeEstado({ id, estado: estadoAEnviar, token: context.tokenLogin.token })
    .then(data => { console.log(`la data del botonn `, data); return data })
    .then(data => {
      //remplazamos el pedido de nuetra lista de pedidos
      const pedidoIndex = context.items.findIndex(pedido => pedido.id == data.id)

      if (!pedidoIndex || pedidoIndex < 0) {
        console.log(`ocurrio un error , no esta el pediod en la lista`);
      } else {
        const newItems = [...context.items]
        newItems[pedidoIndex] = { data: data, ref: undefined }

        context.setItems(newItems)
      }
    })
    .catch((error) => {
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


function eventoBtn(estado, role) {
  const botonAction = listaEstados[listaEstados.findIndex(e => e.name == estado)]

  const view = botonAction.rolesView.includes(role) ? botonAction.estadoNext : false
  const acceses = botonAction.rolesActions.includes(role) ? true : false

  return { view, acceses }
}

export { BotonAccionPedido }