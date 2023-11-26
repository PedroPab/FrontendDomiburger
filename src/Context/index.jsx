/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from 'react';
import { CambiarTema } from '../components/ThemeDark/theme';
import { useLocalStorage } from '../Utils/localStore';
import { filtrarPedidos } from '../Utils/filtrarPedidos';
import socketApp from '../Utils/socket';

export const MiContexto = createContext()

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  //get pedidos 
  const [items, setItems] = useState([])
  // const { item: items, saveItem: setItems } = useLocalStorage({ itemName: 'items', initialValue: null })

  //token de usuario
  const { item: tokenLogin, saveItem: setTokenLogin } = useLocalStorage({ itemName: 'tokenUser', initialValue: {} })

  // Estado para el modo oscuro
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: true })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };


  const manejarAccion = () => {
    // Lógica de la acción
    // mostrarNotificacion("Acción realizada con éxito!");
    // useNotificacionConSonido()
    console.log('Alerta activada');
  };
  useEffect(() => {
    const socket = socketApp()
    // Escuchar eventos de Socket.IO
    socket.on('connect', () => {
      console.log(`conectando 🏁`);
      // const token = `Bearer ${tokenLogin.token}`
      const ROLE = tokenLogin?.user?.role
      const ID = tokenLogin?.user?.id
      if (!ROLE || !ID) return
      socket.emit('api/v2/pedidos/role', ROLE, ID);
    });

    // Escuchar eventos de Socket.IO
    socket.on('message', (data) => {
      console.log(`message `, data);
    });

    socket.on('pedidosIniciales', (pedido) => {
      setItems(filtrarPedidos(pedido, tokenLogin.user.role))
    })

    socket.on('pedidos/added', (pedido) => {
      console.log(`se creo un nuevo pedido`);
      manejarAccion()
      console.log(`los pedios actuales son :`, items);
      setItems(itemsPrevios => {
        const mapItems = new Map(itemsPrevios.map(item => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        const newArray = Array.from(mapItems.values());
        return filtrarPedidos(newArray, tokenLogin.user.role);
      });
    });

    socket.on('pedidos/modified', (pedido) => {
      console.log(`se modifico un pedido`);
      //creamos un mapa para que no se reten y se puedan acutralisar 
      setItems(itemsPrevios => {
        const mapItems = new Map(itemsPrevios.map(item => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        const newArray = Array.from(mapItems.values());
        return filtrarPedidos(newArray, tokenLogin.user.role);

      });

    });

    // socket.on('api/pedidos', (pedidos) => {
    //   console.log("🎈:", pedidos)

    //   //creamos un mapa para que no se reten y se puedan acutralisar 
    //   const mapItems = new Map
    //   items?.forEach(element => {
    //     mapItems.set(element.id, element)
    //   });

    //   const countPre = mapItems.size

    //   let pedidosNuevos = []
    //   pedidos?.forEach(element => {
    //     mapItems.set(element.id, element)
    //   });
    //   const countPos = mapItems.size

    //   if (countPos > countPre) lanzarAlarma(pedidosNuevos)

    //   const newArrayItems = Array.from(mapItems.values());

    //   setItems(newArrayItems);

    // });

    // Limpiar el listener cuando el componente se desmonta
    return () => {
      // socket.off('connect');
      // socket.off('message');
      // socket.off('pedidosIniciales');
      // socket.off('pedidos/added');
      // socket.off('pedidos/modified');
    };

  }, [tokenLogin]);

  useEffect(() => {
    console.log(`items`, items);
    setItems(itemsPrevios => {
      const mapItems = new Map(itemsPrevios.map(item => {
        return [item.id, item]
      }));

      let newArray = Array.from(mapItems.values())

      //revisomos que que no estn en facaturardos, y si estn en pendiente tranfesrtenc si tienen el pago se elimine
      return filtrarPedidos(newArray, tokenLogin?.user?.role);


    });
  }, [tokenLogin])



  ///aletas de la aplicacion 
  const [alerts, setAlerts] = useState([]);

  //el pedio que tenemos selecionado 
  const [indexItems, setIndexItems] = useState(null)

  //zoom del mapa
  const [zoomMaps, setZoomMaps] = useState(15)

  const [alertaActiva, setAlertaActiva] = useState(false);



  return (
    <MiContexto.Provider value={
      {
        // token , pued no tener un token hasta que ingrese en login 
        tokenLogin, setTokenLogin,


        modoOscuro, alternarModo,

        items, setItems,

        alerts, setAlerts,

        indexItems, setIndexItems,

        zoomMaps, setZoomMaps,

        alertaActiva, setAlertaActiva,
      }
    }>
      <CambiarTema />
      {children}
    </MiContexto.Provider>
  )
}


