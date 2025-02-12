import { useEffect, useState, useCallback, useMemo } from "react";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import { LocationsService } from "../../../apis/clientV2/LocationsService";
import { useAuth } from "../../../Context/AuthContext";
import { LocationCardReduce } from "../../../components/Locations/LocationCardReduce.jsx";
import { NavigationButtons } from "./NavigationButtons.jsx";

const LocationSelectionStep = ({ onNext, onPrev, chosenLocation, setChosenLocation }) => {
  const { usuarioActual, token } = useAuth();
  const idUser = usuarioActual?.uid;

  const [locations, setLocations] = useState([]);
  const [errorLocations, setErrorLocations] = useState(null);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Memoizamos la instancia del servicio para evitar recreaciones innecesarias
  const locationsService = useMemo(() => new LocationsService(token), [token]);

  // Función para obtener las ubicaciones, usando useCallback para evitar recreaciones
  const fetchLocations = useCallback(async () => {
    if (!idUser || !token) return;

    setLoadingLocations(true);
    setErrorLocations(null);

    const controller = new AbortController();
    try {
      const rta = await locationsService.getByIdUser(idUser, { signal: controller.signal });
      setLocations(rta.data?.body || []);
    } catch (error) {
      if (error.name !== "AbortError") {
        setErrorLocations(error);
      }
    } finally {
      setLoadingLocations(false);
    }

    return () => controller.abort(); // Cancelar solicitud si el componente se desmonta
  }, [idUser, token, locationsService]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return (
    <Container>
      <h2 className="fw-bold mt-3 mb-3">Escoge una ubicación!</h2>
      <p>Escoge una de las ubicaciones que tienes guardadas o crea una nueva.</p>

      {/* Mensaje de carga */}
      {loadingLocations && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando ubicaciones...</span>
          </Spinner>
        </div>
      )}

      {/* Mensaje de error */}
      {errorLocations && (
        <Alert variant="danger" className="my-3">
          Hubo un error al cargar las ubicaciones. Intenta nuevamente.
        </Alert>
      )}

      {/* Lista de ubicaciones */}
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

      {/* Botones de navegación */}
      <NavigationButtons onNext={onNext} onPrev={onPrev} disabled={!chosenLocation} />
    </Container>
  );
};

export { LocationSelectionStep };
