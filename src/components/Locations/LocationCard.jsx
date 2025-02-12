import { useState } from "react";
import { Card, Table, Button, Collapse } from "react-bootstrap";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FaInfoCircle, FaEdit, FaMoon, FaSun } from "react-icons/fa";
import { usePreferences } from "../../Context/PreferencesContext"; // Importa el contexto

const ENV = import.meta.env;

const AddressCard = ({ location, onEdit }) => {
  const { address, comment, coordinates, floor, city, state, country, postalCode, propertyType } = location;

  const { isDarkMode } = usePreferences(); // Obtiene el estado del tema
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.VITE_KEYMAPS,
    libraries: ["places"],
  });

  const [showMore, setShowMore] = useState(false);

  // Estilos de mapa para modo claro y oscuro
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

  return (
    <Card className="shadow-sm rounded-4" style={{ transition: "0.3s" }}>
      <Card.Body>
        {/* Dirección Principal */}
        <h6>{address || "Dirección no disponible"}</h6>
        <p className="text-muted fst-italic">{comment || "Sin comentarios"}</p>
        {/* Mapa */}
        {isLoaded ? (
          <div className="rounded-3 overflow-hidden mt-2" style={{ height: "150px", width: "100%" }}>
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={{ lat: coordinates?.lat || 0, lng: coordinates?.lng || 0 }}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                styles: isDarkMode ? mapStyles.dark : mapStyles.light, // Aplica tema dinámicamente
              }}
              zoom={16}
            >
              <Marker position={{ lat: coordinates?.lat || 0, lng: coordinates?.lng || 0 }} label="📍" />
            </GoogleMap>
          </div>
        ) : (
          <p className="text-center text-muted">Cargando mapa...</p>
        )}

        {/* Botones */}
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant={showMore ? "primary" : "outline-primary"}
            className="rounded-pill px-4"
            onClick={() => setShowMore(!showMore)}
          >
            <FaInfoCircle className="me-2" />
            {showMore ? "Ocultar info" : "Ver más"}
          </Button>

          <Button variant="outline-success" className="rounded-pill px-4" onClick={onEdit}>
            <FaEdit className="me-2" />
            Editar
          </Button>
        </div>

        {/* Sección Colapsable con más información */}
        <Collapse in={showMore}>
          <div className="mt-4">
            <Table responsive bordered hover className="mb-0 rounded-3 overflow-hidden">
              <tbody>
                <tr>
                  <td className="fw-bold bg-light">Piso/Apt</td>
                  <td>{floor || "N/A"}</td>
                </tr>
                <tr>
                  <td className="fw-bold bg-light">Ciudad</td>
                  <td>{city || "N/A"}</td>
                </tr>
                <tr>
                  <td className="fw-bold bg-light">Estado</td>
                  <td>{state || "N/A"}</td>
                </tr>
                <tr>
                  <td className="fw-bold bg-light">País</td>
                  <td>{country || "N/A"}</td>
                </tr>
                <tr>
                  <td className="fw-bold bg-light">Código Postal</td>
                  <td>{postalCode || "N/A"}</td>
                </tr>
                <tr>
                  <td className="fw-bold bg-light">Tipo de Propiedad</td>
                  <td>{propertyType || "N/A"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export default AddressCard;
