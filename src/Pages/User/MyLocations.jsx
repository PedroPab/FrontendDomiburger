import React, { useEffect, useState } from 'react';
import LayoutCliente from '../../Layout/LayoutCliente';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import { locationsService } from '../../apis/clientV2/locationsService';
import {
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';

const MyLocations = () => {
  const [locations, setLocations] = useState([]);
  const [errorLocations, setErrorLocations] = useState(null);
  const [loadingLocations, setLoadingLocations] = useState(true);

  // Estados para el modal de creación de nueva ubicación
  const [showModal, setShowModal] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationAddress, setNewLocationAddress] = useState('');
  const [creatingLocation, setCreatingLocation] = useState(false);
  const [errorCreateLocation, setErrorCreateLocation] = useState(null);

  const { usuarioActual, token } = useAuth();
  const idUser = usuarioActual?.uid;

  useEffect(() => {
    const findLocations = async () => {
      try {
        const rta = await locationsService.getByIdUser(idUser, token);
        setLocations(rta?.body);
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

  // Función para crear una nueva ubicación
  const handleCreateLocation = async (e) => {
    e.preventDefault();
    setCreatingLocation(true);
    setErrorCreateLocation(null);

    try {
      const newLocation = {
        name: newLocationName,
        address: newLocationAddress,
        userId: idUser, // En caso de que el backend requiera el id del usuario
      };

      // Llamada a la API para crear la nueva ubicación
      const response = await locationsService.create(newLocation, token);

      // Agregar la nueva ubicación a la lista existente
      setLocations((prevLocations) => [...prevLocations, response.body]);

      // Limpiar el formulario y cerrar el modal
      setNewLocationName('');
      setNewLocationAddress('');
      setShowModal(false);
    } catch (error) {
      setErrorCreateLocation(error);
    } finally {
      setCreatingLocation(false);
    }
  };

  return (
    <LayoutCliente>
      <NavbarCliente />
      <Container className="mt-4">
        <Row className="mb-3">
          <Col>
            <h1 className="mb-4">Mis Ubicaciones</h1>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button variant="primary" onClick={() => setShowModal(true)}>
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
                  <Col key={location.id} xs={12} md={6} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title>{location.name}</Card.Title>
                        <Card.Text>{location.address}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal para crear una nueva ubicación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Ubicación</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateLocation}>
          <Modal.Body>
            {errorCreateLocation && (
              <Alert variant="danger">
                Error al crear la ubicación: {errorCreateLocation.message}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formLocationName">
              <Form.Label>Nombre de la Ubicación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={newLocationName}
                onChange={(e) => setNewLocationName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocationAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la dirección"
                value={newLocationAddress}
                onChange={(e) => setNewLocationAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={creatingLocation}>
              {creatingLocation ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Crear'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </LayoutCliente>
  );
};

export default MyLocations;
