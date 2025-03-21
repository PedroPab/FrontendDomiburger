import { useRef, useEffect, useCallback } from "react";

const useNotificationSound = (url) => {
	const audioRef = useRef(null);

	// Inicializamos la instancia del Audio cuando se monta el hook o cambia la URL.
	useEffect(() => {
		audioRef.current = new Audio(url);
	}, [url]);

	// Función para reproducir el sonido de notificación una vez.
	const playNotification = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.play();
		}
	}, []);

	return playNotification;
};

export { useNotificationSound };
