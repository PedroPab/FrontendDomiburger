import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { LocationsService } from '../../apis/clientV2/LocationsService';
import { useAuth } from '../../Context/AuthContext';
import { LocationCard } from '../../components/Locations/LocationCard';
import { UserLayout } from '../../Layout/UserLayout';
import { USER_ROUTES } from '../../Utils/const/namesRutes';

const MyLocations = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [errorLocations, setErrorLocations] = useState(null);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const { usuarioActual, token } = useAuth();
  const idUser = usuarioActual?.uid;
  const locationsService = new LocationsService(token)
  useEffect(() => {
    const findLocations = async () => {
      try {
        const rta = await locationsService.getByIdUser(idUser);
        console.log(`[ ~ findLocations ~ rta]`, rta)
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
    <UserLayout>
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <h1 className="mb-4">Mis Ubicaciones</h1>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button variant="primary"
              onClick={() => navigate(USER_ROUTES.routes.CREATE_LOCATION)}>
              Crear Nueva Ubicación
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Spinner mientras se cargan las ubicaciones */}
            {loadingLocations && (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </Spinner>
              </div>
            )}

            {/* Mensaje de error si ocurre algún problema al cargar */}
            {errorLocations && (
              <Alert variant="danger">
                Ocurrió un error al cargar las ubicaciones: {errorLocations.message}
              </Alert>
            )}

            {/* Mensaje si no hay ubicaciones */}
            {!loadingLocations && !errorLocations && locations.length === 0 && (
              <Alert variant="info">No se encontraron ubicaciones.</Alert>
            )}

            {/* Lista de ubicaciones */}
            {!loadingLocations && !errorLocations && locations.length > 0 && (
              <Row>
                {locations.map((location) => (
                  <Col className='mb-3' key={location.id} xs={12} md={6} lg={4}>
                    <LocationCard location={location} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </UserLayout>
  );
};

export default MyLocations;
