import { useEffect, useCallback, useState } from 'react';

const useShowNotification = () => {
	const [permission, setPermission] = useState(Notification?.permission);

	// Solicita permiso cuando el hook se monta
	useEffect(() => {
		if ('Notification' in window && Notification.permission === 'default') {
			Notification.requestPermission().then(setPermission);
		} else {
			setPermission(Notification?.permission);
		}
	}, []);

	// Función para mostrar una notificación
	const notify = useCallback((title, options = {}) => {
		if (!('Notification' in window)) {
			console.error('Este navegador no soporta notificaciones.');
			return;
		}

		if (permission === 'granted') {
			new Notification(title, options);
		} else if (permission === 'default') {
			Notification.requestPermission().then(result => {
				setPermission(result);
				if (result === 'granted') {
					new Notification(title, options);
				}
			});
		} else {
			console.warn('Permiso para notificaciones denegado.');
		}
	}, [permission]);

	return { notify, permission };
};

export { useShowNotification }