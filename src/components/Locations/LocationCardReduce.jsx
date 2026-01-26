import { Card } from "react-bootstrap";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { usePreferences } from "../../Context/PreferencesContext";
const ENV = import.meta.env;

// Adaptación de LocationCardReduce para mostrar solo mapa, dirección y comentario
const LocationCardReduce = ({ location, isSelect, onClick }) => {
  const { address, comment, coordinates } = location;

  const { isDarkMode } = usePreferences(); // Obtiene el estado del tema
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.VITE_KEYMAPS,
    libraries: ["places"],
  });
  const mapStyles = {
    dark: [
      { elementType: "geometry", stylers: [{ color: "#212121" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#383838" }] },
      { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
    ],
    light: [],
  };
  // Estilos de la tarjeta dependiendo de si está seleccionada
  const cardClasses = isSelect
    ? "card shadow-sm border-success bg-success-subtle "
    : "card shadow-sm border-muted ";

  return (
    <Card className={cardClasses} onClick={onClick} style={{ transition: "0.3s" }}>
      <Card.Body>
        <h6>{address || "Dirección no disponible"}</h6>
        <p className="text-muted fst-italic">{comment || "Sin comentarios"}</p>

        {isLoaded ? (
          <div style={{ height: "90px", width: "100%" }} className="rounded-3 overflow-hidden mt-2">
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={{ lat: coordinates?.lat || 0, lng: coordinates?.lng || 0 }}
              options={{
                disableDefaultUI: true,   // Desactiva los controles predeterminados
                zoomControl: false,       // Desactiva el botón de zoom
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                gestureHandling: 'none',  // Desactiva las interacciones táctiles (gestos)
                styles: isDarkMode ? mapStyles.dark : mapStyles.light, // Aplica tema dinámicamente

              }}
              zoom={16}
            >

              <Marker position={{ lat: coordinates?.lat || 0, lng: coordinates?.lng || 0 }} />
            </GoogleMap>
          </div>
        ) : (
          <p className="text-center text-muted">Cargando mapa...</p>
        )}
      </Card.Body>
    </Card>
  );
};

export { LocationCardReduce };
