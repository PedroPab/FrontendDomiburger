import { Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { MiContexto } from '../../../../Context'

import { traladarPedidoDeEstado } from '../../../../Utils/utilsApi'
import { listaEstados } from '../../../../Utils/listEstados';
import { agregarAlerta, retirarAlerta } from '../../../../Utils/alert';
import { makeId } from '../../../../Utils/makeId';
import { filtrarPedidos } from '../../../../Utils/filtrarPedidos';
import { usePreferences } from '../../../../Context/PreferencesContext';
import { useAuth } from '../../../../Context/AuthContext';


const BotonAccionPedido = ({ dataPedido }) => {
  const context = useContext(MiContexto)
  const { token } = useAuth()
  const { roleSelect } = usePreferences()

  //miramos cual es el la accion que se va ha hacer 
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const activarAccion = () => {
    handleToggle()
    //ejecutamos la accion  del boton 
    // console.log(`el pedido ejecuta la funcion para el estado del id ${dataPedido.id} con el estado ${dataPedido.estado}`);
    switchaFunctionMoviEstate({ id: dataPedido.id, estado: dataPedido.estado }, context, token, roleSelect)


  }

  const ROLE = usePreferences().roleSelect
  const objBotonEvent = eventoBtn(dataPedido.estado, ROLE)


  return (
    <>

      {isVisible ? (
        objBotonEvent.acceses ?
          <Button size="" variant="outline-success" onClick={handleToggle} >
            {objBotonEvent.view}
          </Button> :
          <></>
      ) : (
        <div className='btn btn-group' >
          <Button size="" variant="outline-success" onClick={activarAccion}>Confirmar</Button>
          <Button size="" variant="outline-danger" onClick={handleToggle}>Cancelar</Button>
        </div>
      )}
    </>
  );
}

function switchaFunctionMoviEstate({ id, estado }, context, token, role) {
  // por motivos de las desiciones del disenador de la api (yo) se ponen  el esto al que se va  a poner , y en minusculas , proximo a coreeccion
  const estadoAEnviar = listaEstados[listaEstados.findIndex(e => e.name == estado) + 1].name
  //ejecutamos el trapaso
  traladarPedidoDeEstado({ id, estado: estadoAEnviar, token })
    // .then(data => { console.log(`la data del botonn `, data); return data })
    .then(data => {
      //remplazamos el pedido de nuetra lista de pedidos
      // const mapItems = new Map
      // context.items?.forEach(element => {
      //   mapItems.set(element.id, element)
      // });
      // mapItems.set(data.id, data)
      // const newArrayItems = Array.from(mapItems.values());

      context.setItems(itemsPrevios => {
        const mapItems = new Map(itemsPrevios.map(item => [item.id, item]));
        mapItems.set(data.id, data);

        const newArray = Array.from(mapItems.values());
        return filtrarPedidos(newArray, role);
      });
      // context.setItems(() => [...newArrayItems])

      // context.setItems(newArrayItems)

    })
    .catch((error) => {
      //agregamos un aleta al estado de alerta y en 5s lo quitamos 
      const newAlert = {
        type: 'danger',
        message: error.message,
        id: makeId(5),
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