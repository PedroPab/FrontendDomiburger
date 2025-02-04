import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { locationsService } from '../../apis/clientV2/locationsService';
import { useAuth } from '../../Context/AuthContext';
import LayoutCliente from '../../Layout/LayoutCliente';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from '../../components/MapComponent/MapComponent';
import { TypeAndFloorInput } from '../../components/FormsInputs/TypeAndFloorInput';

const CreateLocation = () => {
  const { usuarioActual, token } = useAuth();

  // Estados para el manejo de la petición
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);


  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {

      const formData = {
      }
      // Llamada al servicio para crear la ubicación
      await locationsService.create(formData, token);

      // Si todo sale bien, mostramos un mensaje de éxito y opcionalmente limpiamos el formulario
      setSuccess(true);
      setDireccion('');
      setPiso('');
      setTipoPropiedad('');
      setComentario('');
      setFotos([]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  const ENV = import.meta.env

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

  //Floor piso
  const [floor, setFloor] = useState('');
  const [propertyType, setPropertyType] = useState('');


  return (
    <LayoutCliente>
      <NavbarCliente />
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="mb-4">Crear Nueva Ubicación</h1>

            {error && <Alert variant="danger">Error: {error.message}</Alert>}
            {success && <Alert variant="success">¡Ubicación creada exitosamente!</Alert>}


            {/* mapa */}
            {isLoaded &&
              <MapComponent center={centerOrigin}
                stateCoordenadas={[coordinates, setCoordinates]}
                stateDireccion={[inputDataDireccion, setInputDataDireccion]}
              />
            }

            {/* form input del piso */}
            <TypeAndFloorInput
              floor={floor}
              setFloor={setFloor}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
            />


          </Col>
        </Row>
      </Container >
    </LayoutCliente >
  );
};

export { CreateLocation };
