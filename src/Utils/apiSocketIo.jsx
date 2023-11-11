import { useEffect, useState } from "react";
import socket from './socket.jsx'; // Asegúrate de tener la ruta correcta hacia tu archivo socket.js

const useSocketIo = () => {
  const [pedidos, setPedidos] = useState([]);


  useEffect(() => {
    // Escuchar eventos de Socket.IO
    socket.on('connect', (nuevoPedido) => {


      console.log("⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚⌚", nuevoPedido)

      // socket.emit('api/pedidos/role');
      socket.emit('mensaje', 'este es un mesages');
      const ROLE = 'domiciliario'
      const ID = '0CKM4kjOBTMccI1UOo6J'

      socket.emit('api/pedidos/role', ROLE, ID);

    });


    socket.on('api/pedidos', (pedidosEEE) => {
      console.log(`pedidoss4 `, pedidosEEE);
      setPedidos([...pedidos, pedidosEEE]);

    });


    // Limpiar el listener cuando el componente se desmonta
    return () => {
      socket.off('nuevoPedido');
    };
  }, [pedidos]);
}

export { useSocketIo }