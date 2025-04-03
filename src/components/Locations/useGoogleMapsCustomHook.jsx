// useGoogleMapsCustomHook.js
import { useLoadScript, GoogleMap } from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";
import { usePreferences } from "../../Context/PreferencesContext";

const ENV = import.meta.env;

// Define the libraries array as a constant outside the hook
const LIBRARIES = ["places"];

export const useGoogleMapsCustomHook = () => {
	// 1) Carga del script de Google Maps
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: ENV.VITE_KEYMAPS,
		libraries: LIBRARIES, // Use the static libraries array
	});

	// 2) Modo oscuro o claro

	// 3) Estilos para modo claro y modo oscuro
	const mapStyles = {
		dark: [
			{ elementType: "geometry", stylers: [{ color: "#212121" }] },
			{ elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
			{ elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
			{
				featureType: "road",
				elementType: "geometry",
				stylers: [{ color: "#383838" }],
			},
			{
				featureType: "road",
				elementType: "labels.text.fill",
				stylers: [{ color: "#ffffff" }],
			},
		],
		light: [],
	};

	// 4) Estado donde guardamos nuestro componente de mapa (una vez listo)
	const [MapsGoogle, setMapsGoogle] = useState(null);

	// Referencia a la instancia nativa de Google Maps
	const mapRef = useRef(null);
	// 5) Definimos el componente que exportaremos cuando isLoaded sea true
	const MapComponent = ({
		children,
		center = { lat: 0, lng: 0 },
		zoom = 16,
		mapContainerStyle = { height: "100%", width: "100%" },
		gestureHandling = "none",
		...rest
	}) => {
		const { isDarkMode } = usePreferences();


		// En cada render, actualizamos las opciones si ya tenemos la referencia
		useEffect(() => {
			if (mapRef.current) {
				mapRef.current.setOptions({
					...mapRef.current.options,
					styles: isDarkMode ? mapStyles.dark : mapStyles.light,
				});
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isDarkMode]);


		return (
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				center={center}
				zoom={zoom}
				// Configuración inicial
				options={{
					disableDefaultUI: true,
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
					gestureHandling,
					// Establecemos el estilo según el modo de tema
					styles: isDarkMode ? mapStyles.dark : mapStyles.light,
				}}
				onLoad={(map) => mapRef.current = map}
				{...rest}
			>
				{children}
			</GoogleMap >
		);
	};

	// 6) Cuando isLoaded sea true, guardamos el MapComponent
	useEffect(() => {
		if (isLoaded) {
			// Seteamos el componente sólo una vez
			setMapsGoogle(() => MapComponent);
		}
	}, [isLoaded]);

	// 7) Retornamos [ComponenteMap, estadoDeCarga]
	return [MapsGoogle, isLoaded];
};
