import { useRef, useEffect, useCallback } from "react";
import alertSound from './../assets/music/livechat-alerte.mp3'
import erroSound from './../assets/music/error.mp3'
import errorCriticalSound from './../assets/music/errorCritical.mp3'
import successSound from './../assets/music/success.mp3'

const useNotificationSound = () => {
	const audioAlertRef = useRef(null);
	const audioErroRef = useRef(null);
	const audioErrorCriticalRef = useRef(null);
	const audioSuccessRef = useRef(null);
	// Inicializamos la instancia del Audio cuando se monta el hook o cambia la URL.
	useEffect(() => {
		audioAlertRef.current = new Audio(alertSound);
		audioErroRef.current = new Audio(erroSound);
		audioErrorCriticalRef.current = new Audio(errorCriticalSound);
		audioSuccessRef.current = new Audio(successSound);
	}, []);

	// Función para reproducir el sonido de notificación una vez.
	const alertPlay = useCallback(() => {
		if (audioAlertRef.current) {
			audioAlertRef.current.play();
		}
	}, []);

	// Función para reproducir el sonido de error una vez.
	const erroPlay = useCallback(() => {
		if (audioErroRef.current) {
			audioErroRef.current.play();
		}
	}, []);
	// Función para reproducir el sonido de error crítico una vez.
	const errorCriticalPlay = useCallback(() => {
		if (audioErrorCriticalRef.current) {
			audioErrorCriticalRef.current.play();
		}
	}, []);

	const successPlay = useCallback(() => {
		if (audioSuccessRef.current) {
			audioSuccessRef.current.play();
		}
	}, []);

	return {
		alertSound: alertPlay,
		errorCriticalSound: errorCriticalPlay,
		erroSound: erroPlay,
		successSound: successPlay,
	};
};

export { useNotificationSound };
