import { useEffect, useCallback, useState } from 'react';

const useShowNotification = () => {
	// Si Notification no está definido, asumimos 'denied'
	const [permission, setPermission] = useState(
		typeof Notification !== 'undefined' ? Notification.permission : 'denied'
	);

	// Detectar si el usuario está en un dispositivo iOS
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	// Verificar si la app se ejecuta en modo standalone (instalada)
	const isStandalone =
		window.navigator.standalone === true ||
		window.matchMedia('(display-mode: standalone)').matches;

	useEffect(() => {
		if (typeof Notification === 'undefined') {
			console.warn('Este navegador no soporta notificaciones.');
			setPermission('denied');
			return;
		}

		// En iOS se recomienda solicitar el permiso solo en respuesta a una interacción del usuario.
		// Además, las notificaciones web funcionan sólo en modo standalone.
		if (isIOS && !isStandalone) {
			console.warn('En iOS, las notificaciones web solo funcionan en aplicaciones instaladas (modo standalone).');
			return;
		}

		// Si el permiso está en estado "default", se solicita automáticamente en otros entornos.
		if (Notification.permission === 'default') {
			Notification.requestPermission().then(setPermission);
		} else {
			setPermission(Notification.permission);
		}
	}, [isIOS, isStandalone]);

	const notify = useCallback((title, options = {}) => {
		if (typeof Notification === 'undefined') {
			console.error('Este navegador no soporta notificaciones.');
			return;
		}

		// Verificamos nuevamente para iOS sin modo standalone
		if (isIOS && !isStandalone) {
			console.warn('Las notificaciones en iOS solo funcionan en aplicaciones instaladas.');
			return;
		}

		if (permission === 'granted') {
			new Notification(title, options);
		} else if (permission === 'default') {
			// Es fundamental que esta llamada sea el resultado de una acción del usuario en iOS
			Notification.requestPermission().then(result => {
				setPermission(result);
				if (result === 'granted') {
					new Notification(title, options);
				}
			});
		} else {
			console.warn('Permiso para notificaciones denegado.');
		}
	}, [permission, isIOS, isStandalone]);

	return { notify, permission };
};

export { useShowNotification };
