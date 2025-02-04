import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { locationsService } from '../../apis/clientV2/locationsService';
import { useAuth } from '../../Context/AuthContext';
import LayoutCliente from '../../Layout/LayoutCliente';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import { useLoadScript } from '@react-google-maps/api';
import MapComponent from '../../components/MapComponent/MapComponent';

const CreateLocation = () => {
  const { usuarioActual, token } = useAuth();

  // Estados para los campos del formulario
  const [direccion, setDireccion] = useState('');
  const [piso, setPiso] = useState('');
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [comentario, setComentario] = useState('');
  const [fotos, setFotos] = useState([]); // Aquí se almacenarán los archivos seleccionados

  // Estados para el manejo de la petición
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Manejar el cambio en el input de fotos
  const handleFotosChange = (e) => {
    setFotos(e.target.files);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Usamos FormData para enviar tanto datos como archivos
      const formData = new FormData();
      formData.append('direccion', direccion);
      formData.append('piso', piso);
      formData.append('tipoPropiedad', tipoPropiedad);
      formData.append('comentario', comentario);
      formData.append('userId', usuarioActual?.uid); // Enviar el id del usuario si es necesario

      // Si se seleccionaron fotos, las agregamos al FormData
      if (fotos && fotos.length > 0) {
        for (let i = 0; i < fotos.length; i++) {
          // Algunos backends esperan "fotos[]" como nombre del campo
          formData.append('fotos', fotos[i]);
        }
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
    piso: "",
    valid: false,
  });

  return (
    <LayoutCliente>
      <NavbarCliente />
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="mb-4">Crear Nueva Ubicación</h1>

            {error && <Alert variant="danger">Error: {error.message}</Alert>}
            {success && <Alert variant="success">¡Ubicación creada exitosamente!</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formDireccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese la dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPiso">
                <Form.Label>Piso</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese el piso (opcional)"
                  value={piso}
                  onChange={(e) => setPiso(e.target.value)}
                />
              </Form.Group>


              {/* mapa */}
              {isLoaded &&
                <MapComponent center={centerOrigin}
                  stateCoordenadas={[coordinates, setCoordinates]}
                  stateDireccion={[inputDataDireccion, setInputDataDireccion]}
                />
              }

              <Form.Group className="mb-3" controlId="formTipoPropiedad">
                <Form.Label>Tipo de Propiedad</Form.Label>
                <Form.Select
                  value={tipoPropiedad}
                  onChange={(e) => setTipoPropiedad(e.target.value)}
                  required
                >
                  <option value="">Seleccione un tipo</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="oficina">Oficina</option>
                  <option value="otro">Otro</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formComentario">
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Agrega un comentario (opcional)"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formFotos">
                <Form.Label>Fotos</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFotosChange}
                />
                <Form.Text className="text-muted">
                  Puedes seleccionar una o varias fotos.
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      className="me-2"
                    />
                    Enviando...
                  </>
                ) : (
                  'Enviar'
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </LayoutCliente>
  );
};

export { CreateLocation };
