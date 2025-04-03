// context/OrdersContext.js
import { createContext, useContext, useEffect, useRef, useState } from 'react';
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
import { useShowNotification } from '../hooks/useShowNotification';
export const MiContexto = createContext();

export const ContextProvider = ({ children }) => {
	const apiUrl = getUrlSocket();
	const socket = useRef();

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
	const { notify } = useShowNotification();

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

		if (assignedKitchens.length === 1) {
			changeKitchen(assignedKitchens[0]);
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
			socket.current.connect();
			console.log("Intentando reconectar...");
		}
	};

	useEffect(() => {
		socket.current = io(`${apiUrl}/apiV2`);

		console.log('intentando conectar socket');
		socket.current.connect();
		// Manejamos la conexión inicial
		socket.current.on("connect", () => {
			console.log(`Socket conectado 🏁, ID: ${socket.current.id}`);
			setIsConnected(true); // Indicamos que el socket está conectado
			if (ROLE) {
				// socket.current.emit('api/v2/pedidos/role', ROLE, ID);
				const params = {
					token: token,
					role: ROLE,
					kitchenId: kitchenSelectId
				}
				socket.current.emit('login', params)
			}
			console.log("Señor debugeador , estas son mi variables, no me haga daño")
			console.log(ROLE)
		});

		// Manejo de desconexión
		socket.current.on('disconnect', (reason) => {
			console.log(`Socket desconectado 🥊, razón: ${reason}`);
			setIsConnected(false); // Indicamos que el socket está desconectado
		});

		socket.current.on("message", (newMessage) => {
			//analizar el mensaje
			const { type, message } = newMessage;
			if (type === 'alert') {
				alertSound();
				notify('Nuevo mensaje', { body: message });
			}
			toast(message);
		});

		socket.current.on('order/init', (orders) => {
			// toast(`Cargando pedidos iniciales 🚚, canidad de pedidos ${pedido.length}`);
			console.log('pedidos iniciales', orders.length);
			console.log('pedidos iniciales', orders);
			const processedOrders = filtrarPedidos(orders, ROLE);
			console.log("🚀 ~ socket.current.on ~ processedOrders:", processedOrders)
			setItems(processedOrders);
		});

		socket.current.on('order/create', (pedido) => {
			toast(`Pedido creado 🚚, ${pedido.id}`)
			// notificamos al usuario del nuevo pedido
			alertSound();
			setItems((itemsPrevios) => {
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				mapItems.set(pedido.id, pedido);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});

		socket.current.on('order/update', (pedido) => {
			// toast(`Pedido actualizado 🚚, ${pedido.id}`);
			setItems((itemsPrevios) => {
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				mapItems.set(pedido.id, pedido);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});

		socket.current.on('order/remove', (pedido) => {
			console.warn("🚀 ~ socket.current.on ~ pedido:", pedido)
			toast(`Pedido removido 🚚, ${pedido.id}`);
			setItems((itemsPrevios) => {
				console.warn("🚀 ~ setItems ~ itemsPrevios:", itemsPrevios)
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				console.info("🚀 ~ setItems ~ mapItems:", mapItems)

				mapItems.delete(pedido.id);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});

		socket.current.on('order/delete', (pedido) => {
			toast(`Pedido eliminado 🚚, ${pedido.id}`);
			setItems((itemsPrevios) => {
				const mapItems = new Map(itemsPrevios.map((item) => [item.id, item]));
				mapItems.delete(pedido.id);
				return filtrarPedidos(Array.from(mapItems.values()), ROLE);
			});
		});
		return () => {
			console.warn('Desconectando socket , adios socket.current. te extrañaremos');
			socket.current.off("connect");
			socket.current.off("disconnect");
			socket.current.off("message");
			socket.current.off('pedidosIniciales');
			socket.current.off('pedidos/added');
			socket.current.off('pedidos/modified');
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