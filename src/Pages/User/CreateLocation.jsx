import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { locationsService } from '../../apis/clientV2/locationsService';
import { useAuth } from '../../Context/AuthContext';
import LayoutCliente from '../../Layout/LayoutCliente';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from '../../components/MapComponent/MapComponent';
import { TypeAndFloorInput } from '../../components/FormsInputs/TypeAndFloorInput';
import { NotesInput } from '../../components/FormsInputs/NotesInput';
import { toast } from 'react-toastify';

const ENV = import.meta.env;

const CreateLocation = () => {
  const { token } = useAuth();

  // Estados para el manejo de la petición
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Configuración del mapa
  const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };
  const libraries = ['places'];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: ENV.VITE_KEYMAPS,
    libraries,
  });
  const [coordinates, setCoordinates] = useState({});
  const [inputDataDireccion, setInputDataDireccion] = useState({
    address_complete: "",
    valid: false,
  });

  // Estados para el formulario
  const [floor, setFloor] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [notes, setNotes] = useState('');

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Se arma el objeto con los datos a enviar.
      // Ajusta el objeto según lo que requiera tu backend.
      const formData = {
        floor,
        propertyType,
        notes,
        coordinates,
        address: inputDataDireccion.address_complete,
      };

      // Llamada al servicio para crear la ubicación
      await locationsService.create(formData, token);

      // Mostrar notificación de éxito
      toast.success('¡Ubicación creada exitosamente!');

      // Actualizar estado y limpiar el formulario si es necesario
      setSuccess(true);
      setFloor('');
      setPropertyType('');
      setNotes('');
      // Opcional: reiniciar coordenadas e inputDataDireccion si se requiere

    } catch (err) {
      // Mostrar notificación de error
      toast.error(`Error: ${err.message}`);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutCliente>
      <NavbarCliente />
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="mb-4">Crear Nueva Ubicación</h1>


            {/* Mapa para seleccionar la ubicación */}
            {isLoaded && (
              <MapComponent
                center={centerOrigin}
                stateCoordenadas={[coordinates, setCoordinates]}
                stateDireccion={[inputDataDireccion, setInputDataDireccion]}
              />
            )}

            {/* Input para piso y tipo de inmueble */}
            <TypeAndFloorInput
              floor={floor}
              setFloor={setFloor}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
            />

            {/* Input para notas */}
            <NotesInput notes={notes} setNotes={setNotes} />

            {/* Botón de envío, centrado y con espacio */}
            <div className="d-flex justify-content-center mt-4 mb-4">
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                size="lg"
                className="px-4 py-2"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Creando...
                  </>
                ) : (
                  'Crear Ubicación'
                )}
              </Button>
            </div>
            {error && <Alert variant="danger">Error: {error.message}</Alert>}
            {success && <Alert variant="success">¡Ubicación creada exitosamente!</Alert>}

          </Col>
        </Row>
      </Container>
    </LayoutCliente>
  );
};

export { CreateLocation };
