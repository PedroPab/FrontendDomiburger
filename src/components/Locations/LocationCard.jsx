import { useState } from "react";
import { Card, Table, Button, Collapse, Badge } from "react-bootstrap";
import { Marker } from "@react-google-maps/api";
import { FaInfoCircle, FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import { useGoogleMapsCustomHook } from "./useGoogleMapsCustomHook";
import { DisabledComponent } from "../common/DisabledComponent";

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
  const cardClasses = isSelect
    ? "shadow-sm rounded border border-success border-2 bg-success-subtle"
    : "shadow-sm rounded border border-muted";

  return (
    <Card className={`position-relative ${cardClasses}`} style={{ transition: "all 0.2s ease-in-out", cursor: "pointer" }}>
      <Card.Body>
        {/* Badge de selección */}
        {isSelect && (
          <div className="position-absolute top-0 end-0 m-2">
            <Badge
              bg="success"
              className="d-flex align-items-center gap-1"
              style={{ fontSize: '0.875rem' }}
            >
              <FaCheckCircle /> Seleccionada
            </Badge>
          </div>
        )}

        {/* Dirección Principal */}
        <h6>{address || "Dirección no disponible"}</h6>
        <p className="text-muted fst-italic">{comment || "Sin comentarios"}</p>

        {/* Mapa - Altura optimizada */}
        {isLoaded && MapsGoogle ? (
          <div
            className="rounded-3 overflow-hidden mt-2"
            style={{ height: "100px", width: "100%" }}
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

        {/* Botones - Layout responsive */}
        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mt-3">
          {/* Botón de información */}
          <Button
            variant={showMore ? "primary" : "outline-primary"}
            onClick={() => setShowMore(!showMore)}
            className="w-100 w-sm-auto"
            size="sm"
            aria-expanded={showMore}
            aria-label={showMore ? "Ocultar información adicional" : "Ver más información"}
          >
            <FaInfoCircle className="me-2" />
            {showMore ? "Ocultar info" : "Ver más"}
          </Button>

          {/* Botones de gestión */}
          <div className="d-flex gap-2">
            <DisabledComponent message="La edición de ubicaciones estará disponible próximamente">
              <Button
                disabled
                variant="outline-success"
                onClick={onEdit}
                className="flex-grow-1"
                size="sm"
                aria-label="Editar ubicación (no disponible)"
              >
                <FaEdit className="me-2" />
                Editar
              </Button>
            </DisabledComponent>

            <Button
              variant="outline-danger"
              onClick={onDeled}
              className="flex-grow-1"
              size="sm"
              aria-label="Eliminar ubicación"
            >
              <FaTrash className="me-2" />
              Eliminar
            </Button>
          </div>
        </div>

        {/* Sección Colapsable con más información */}
        <Collapse in={showMore}>
          <div className="mt-3">
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
