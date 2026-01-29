import { useState } from "react";
import { Card, Table, Button, Collapse } from "react-bootstrap";
import { Marker } from "@react-google-maps/api";
import { FaInfoCircle, FaEdit, FaTrash } from "react-icons/fa";
import { useGoogleMapsCustomHook } from "./useGoogleMapsCustomHook"; // tu custom hook

const LocationCard = ({ location, onEdit, onDeled, isSelect }) => {
  const {
    address,
    comment,
    coordinates,
    floor,
    // city,
    // state,
    // country,
    // postalCode,
    propertyType
  } = location;

  const [MapsGoogle, isLoaded] = useGoogleMapsCustomHook();
  const [showMore, setShowMore] = useState(false);

  // Clases de la tarjeta según si está seleccionada o no
  // (Bootstrap 5.2+ incluye clases "bg-primary-subtle", "border-primary", etc.)
  const cardClasses = isSelect
    ? "shadow-sm rounded border border-primary bg-primary-subtle"
    : "shadow-sm rounded border ";

  return (
    <Card className={cardClasses} style={{ transition: "0.3s", cursor: "pointer" }}>
      <Card.Body>
        {/* Dirección Principal */}
        <h6>{address || "Dirección no disponible"}</h6>
        <p className="text-muted fst-italic">{comment || "Sin comentarios"}</p>

        {/* Mapa */}
        {isLoaded && MapsGoogle ? (
          <div
            className="rounded-3 overflow-hidden mt-2"
            style={{ height: "150px", width: "100%" }}
          >
            <MapsGoogle
              center={{ lat: coordinates?.lat || 0, lng: coordinates?.lng || 0 }}
              zoom={16}
            >
              <Marker
                position={{ lat: coordinates?.lat || 0, lng: coordinates?.lng || 0 }}
                label="🌟"
              />
            </MapsGoogle>
          </div>
        ) : (
          <p className="text-center text-muted">Cargando mapa...</p>
        )}

        {/* Botones */}
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant={showMore ? "primary" : "outline-primary"}
            onClick={() => setShowMore(!showMore)}
          >
            <FaInfoCircle className="me-2" />
            {showMore ? "Ocultar info" : "Ver más"}
          </Button>

          <Button
            variant="outline-danger"
            onClick={onDeled}
          >
            <FaTrash className="me-2" />
            Eliminar
          </Button>

          <Button
            disabled
            variant="outline-success"
            onClick={onEdit}
          >
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
                  <td className="fw-bold">Piso/Apt</td>
                  <td>{floor || "N/A"}</td>
                </tr>
                {/* Ejemplo: Si quieres mostrar más campos
                  <tr>
                    <td className="fw-bold">Ciudad</td>
                    <td>{city || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Estado</td>
                    <td>{state || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">País</td>
                    <td>{country || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Código Postal</td>
                    <td>{postalCode || "N/A"}</td>
                  </tr>
                */}
                <tr>
                  <td className="fw-bold">Tipo de Propiedad</td>
                  <td>{propertyType || "N/A"}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Id</td>
                  <td>{location.id}</td>
                </tr>
                <tr>
                  <td className="fw-bold">Google Maps</td>
                  <td>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${coordinates?.lat},${coordinates?.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver en Google Maps
                    </a>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
};

export { LocationCard };
