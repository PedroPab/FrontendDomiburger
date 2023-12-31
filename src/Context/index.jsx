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
  let initDarkMode = false
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // El usuario ha establecido su sistema para usar un tema oscuro
    console.log('Tema oscuro preferido');
    initDarkMode = true
  } else {
    // El usuario ha establecido su sistema para usar un tema claro
    console.log('Tema claro preferido');
    initDarkMode = false
  }
  const { item: modoOscuro, saveItem: setModoOscuro } = useLocalStorage({ itemName: 'modoOscuro', initialValue: initDarkMode })

  // Función para alternar entre el modo oscuro y claro
  const alternarModo = () => {
    setModoOscuro(!modoOscuro);
  };


  const manejarAccion = () => {
    // Lógica de la acción
    // mostrarNotificacion("Acción realizada con éxito!");
    // useNotificacionConSonido()
    // console.log('Alerta activada');
  };
  useEffect(() => {

    const socket = socketApp()
    // console.log("inciando coneccion id: ", JSON.stringify(socket))
    // Escuchar eventos de Socket.IO

    socket.on('connect', () => {
      console.log(`conectando 🏁`);
      console.log(`socket id: ${socket?.id}`);

      // const token = `Bearer ${tokenLogin.token}`
      const ROLE = tokenLogin?.user?.role
      const ID = tokenLogin?.user?.id
      if (!ROLE || !ID) return

      socket.emit('api/v2/pedidos/role', ROLE, ID);
    });

    socket.on('disconnect', () => {
      console.log(`🥊 el  socket se a desconectado : ${socket.id}`)
      return
    })
    socket.on('countConnection', (data) => {
      console.log(`countConnection : `, data)
    })
    // Escuchar eventos de Socket.IO
    socket.on('message', () => {
      // console.log(`message `, data);
    });

    socket.on('pedidosIniciales', (pedido) => {
      setItems(filtrarPedidos(pedido, tokenLogin.user.role))
    })

    socket.on('pedidos/added', (pedido) => {
      // console.log(`se creo un nuevo pedido`);
      manejarAccion()
      // console.log(`los pedios actuales son :`, items);
      setItems(itemsPrevios => {
        const mapItems = new Map(itemsPrevios.map(item => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        const newArray = Array.from(mapItems.values());
        return filtrarPedidos(newArray, tokenLogin.user.role);
      });
    });

    socket.on('pedidos/modified', (pedido) => {
      // console.log(`se modifico un pedido`);
      //creamos un mapa para que no se reten y se puedan acutralisar 
      setItems(itemsPrevios => {
        const mapItems = new Map(itemsPrevios.map(item => [item.id, item]));
        mapItems.set(pedido.id, pedido);
        const newArray = Array.from(mapItems.values());
        return filtrarPedidos(newArray, tokenLogin.user.role);

      });

    });

  }, []);

  useEffect(() => {
    // console.log(`items`, items);
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


