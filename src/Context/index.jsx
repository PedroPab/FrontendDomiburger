// context/OrdersContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { filtrarPedidos } from '../Utils/filtrarPedidos';
// import { socket } from '../Utils/socket';
import { usePreferences } from './PreferencesContext';
import { io } from 'socket.io-client';
import { getUrlSocket } from '../Utils/getUrlApiByOriginPath';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNotificationSound } from '../hooks/useNotificationSound';
import sound from '../assets/music/livechat-alerte.mp3'
export const MiContexto = createContext();

export const ContextProvider = ({ children }) => {
	const apiUrl = getUrlSocket();

	const socket = io(`${apiUrl}/apiV2`);

	const { roleSelect: ROLE } = usePreferences()

	const [items, setItems] = useState([]);
	const [alerts, setAlerts] = useState([]);
	const [idItemSelect, setIdItemSelect] = useState(null);
	const [zoomMaps, setZoomMaps] = useState(15);
	const [alertaActiva, setAlertaActiva] = useState(false);
	const [isConnected, setIsConnected] = useState(false); // Nuevo estado para indicar si está conectado

	const { usuarioActual, token, userData } = useAuth()


	const [kitchenSelectId, setKitchenSelectId] = useLocalStorage('kitchenSelectId', null);

	const alertSound = useNotificationSound(sound);

	const changeKitchen = (id) => {
		setKitchenSelectId(id);
	};

	// al comienzo de la aplicación, se  escoje una cocina
	useEffect(() => {
		//miramos cules son las cocinas que tiene asisgndas el usuario
		const assignedKitchens = userData?.assignedKitchens || [];

		if (assignedKitchens.length < 0) {
			toast.error('No tiene cocinas asignadas');
			changeKitchen(null);
			return
		}

		if (kitchenSelectId) {
			const kitchen = assignedKitchens.find(kitchen => kitchen.id === kitchenSelectId);
			if (kitchen) {
				changeKitchen(kitchen);
				return
			}
		}
		// si tiene cocinas asignadas, se escoge la primera
	}, [usuarioActual]);



	const reconnectSocket = () => {
		if (!isConnected) {
			socket.connect();
			console.log("Intentando reconectar...");
		}
	};

	useEffect(() => {
		console.log('intentando conectar socket');
		socket.connect();
		// Manejamos la conexión inicial
		socket.on("connect", () => {
			console.log(`Socket conectado 🏁, ID: ${socket.id}`);
			setIsConnected(true); // Indicamos que el socket está conectado
			if (ROLE) {
				// socket.emit('api/v2/pedidos/role', ROLE, ID);
				const params = {
					token: token,
					role: ROLE,
					kitchenId: kitchenSelectId
				}
				socket.emit('login', params)
			}
			console.log("Señor debugeador , estas son mi variables, no me haga daño")
			console.log(ROLE)
		});

		// Manejo de desconexión
		socket.on('disconnect', (reason) => {
			console.log(`Socket desconectado 🥊, razón: ${reason}`);
			setIsConnected(false); // Indicamos que el socket está desconectado
		});

		socket.on("message", (newMessage) => {
			//analizar el mensaje
			const { type, message } = newMessage;
			if (type === 'alert') alertSound();
			toast(message);
		});

		socket.on('order/init', (orders) => {
			// toast(`Cargando pedidos iniciales 🚚, canidad de pedidos ${pedido.length}`);
			console.log('pedidos iniciales', orders.length);
			console.log('pedidos iniciales', orders);
			const processedOrders = filtrarPedidos(orders, ROLE);
			console.log("🚀 ~ socket.on ~ processedOrders:", processedOrders)
			setItems(processedOrders);
		});

		socket.on('order/create', (pedido) => {
			toast(`Pedido creado 🚚, ${pedido.id}`)
			// notificamos al usuario del nuevo pedido
			alertSound();
			setItems((itemsPrevios) => {
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				mapItems.set(pedido.id, pedido);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});

		socket.on('order/update', (pedido) => {
			// toast(`Pedido actualizado 🚚, ${pedido.id}`);
			setItems((itemsPrevios) => {
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				mapItems.set(pedido.id, pedido);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});

		socket.on('order/remove', (pedido) => {
			// toast(`Pedido eliminado 🚚, ${pedido.id}`);
			setItems((itemsPrevios) => {
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				mapItems.delete(pedido.id);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});

		socket.on('order/delete', (pedido) => {
			toast(`Pedido eliminado 🚚, ${pedido.id}`);
			setItems((itemsPrevios) => {
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				mapItems.delete(pedido.id);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("message");
			socket.off('pedidosIniciales');
			socket.off('pedidos/added');
			socket.off('pedidos/modified');
		};
	}, [usuarioActual, ROLE, kitchenSelectId]);


	return (
		<MiContexto.Provider
			value={{
				items,
				setItems,
				alerts,
				setAlerts,
				idItemSelect,
				setIdItemSelect,
				zoomMaps,
				setZoomMaps,
				alertaActiva,
				setAlertaActiva,
				isConnected, // Exportamos el estado de conexión
				reconnectSocket, // Exportamos la función de reconexión

				kitchenSelectId,
				changeKitchen
			}}
		>
			{children}
		</MiContexto.Provider>
	);
};

export const useMiContexto = () => useContext(MiContexto)