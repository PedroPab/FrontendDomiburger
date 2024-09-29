import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const ENV = import.meta.env;

const libraries = ["places"]; // Añadimos 'places' para habilitar el Autocomplete de Google

const MapComponent = ({ coordinates, setCoordinates }) => {
  // const [coordinates, setCoordinates] = useState({ lat: 10, lng: -84 });
  const [manualSelect, setManualSelect] = useState(false);
  const autocompleteRef = useRef(null);

  // Esta función se activa cuando el usuario selecciona una opción de autocompletado
  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    }
  };

  const handleMapClick = (e) => {
    if (manualSelect) {
      setCoordinates({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const handleMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCoordinates({ lat, lng });
  };

  useEffect(() => {
    console.log("coordinates", coordinates);
  }, [coordinates]);

  return (
    <div>
      <LoadScript googleMapsApiKey={ENV.VITE_KEYMAPS} libraries={libraries}>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Escribe la dirección..."
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
        </Autocomplete>

        <button onClick={() => setManualSelect(!manualSelect)}>
          {manualSelect ? "Desactivar selección manual" : "Seleccionar manualmente"}
        </button>

        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={coordinates}
          zoom={coordinates.lat ? 15 : 6}
          onClick={handleMapClick}
        >
          {coordinates.lat && (
            <Marker
              key={1}
              position={coordinates}
              draggable={true} // Permite que el marcador sea arrastrado
              onDragEnd={handleMarkerDragEnd} // Actualiza las coordenadas cuando se arrastra el marcador
            />
          )}
        </GoogleMap>
      </LoadScript>

      {coordinates.lat && (
        <div>
          <h3>Información de la ubicación seleccionada:</h3>
          <p>Latitud: {coordinates.lat}</p>
          <p>Longitud: {coordinates.lng}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
