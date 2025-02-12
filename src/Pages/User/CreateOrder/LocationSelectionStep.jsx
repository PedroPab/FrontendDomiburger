import { useEffect, useState } from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { LocationsService } from "../../../apis/clientV2/LocationsService";
import { useAuth } from "../../../Context/AuthContext";
import { LocationCardReduce } from "../../../components/Locations/LocationCardReduce.jsx";

const LocationSelectionStep = ({ onNext, onPrev, chosenLocation, setChosenLocation }) => {
  const { usuarioActual, token } = useAuth();
  const idUser = usuarioActual?.uid;

  const [locations, setLocations] = useState([]);
  const [errorLocations, setErrorLocations] = useState(null);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const locationsService = new LocationsService(token);

  useEffect(() => {
    const findLocations = async () => {
      try {
        const rta = await locationsService.getByIdUser(idUser);
        setLocations(rta.data?.body);
      } catch (error) {
        setErrorLocations(error);
      } finally {
        setLoadingLocations(false);
      }
    };

    setErrorLocations(null);
    setLoadingLocations(true);

    if (idUser && token) {
      findLocations();
    }
  }, [idUser, token]);

  return (
    <Container>
      {/* Contenedor que permite desplazamiento */}
      <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
        {!loadingLocations && !errorLocations && locations.length > 0 && (
          <Row>
            {locations.map((location) => (
              <Col key={location.id} xs={12} md={6} lg={4} className="mb-3">
                <LocationCardReduce
                  location={location}
                  isSelect={chosenLocation?.id === location.id}
                  onClick={() => setChosenLocation(location)}
                />
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Mostrar los botones de navegación */}
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={onPrev}>
          Atrás
        </button>
        <button className="btn btn-primary ms-3" onClick={onNext} disabled={!chosenLocation}>
          Siguiente
        </button>
      </div>
    </Container>
  );
};

export { LocationSelectionStep };
