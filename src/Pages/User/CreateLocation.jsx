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
import Joi from 'joi';

const ENV = import.meta.env;

const TYPES = {
  HOUSE: 'house',   // Casa
  BUILDING: 'building', // Edificio
  URBANIZATION: 'urbanization', // Urbanización
  OFFICE: 'office'  // Oficina
};

const listTypes = Object.values(TYPES);

const createLocationSchema = Joi.object({
  address: Joi.string().min(3).max(255).required().messages({ 'any.required': 'Establece una dirección', 'string.min': 'La dirección debe tener al menos 3 caracteres', 'string.empty': 'Debes ingresar un valor' }),
  state: Joi.string().min(3).max(255).optional(),
  floor: Joi.string().max(255).required().messages({ 'any.required': 'Necesitamos el piso', 'string.min': 'El piso debe tener al menos 3 caracteres', 'string.empty': 'Debes ingresar un valor' }),
  city: Joi.string().min(3).max(255).optional(),
  country: Joi.string().min(3).max(255).optional(),
  postalCode: Joi.string().min(3).max(255).optional(),
  coordinates: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).required().messages({ 'any.required': 'Necesitamos las coordenadas , necesitas ayudas?' }),
  comment: Joi.string().min(3).max(255).optional(),
  propertyType: Joi.string().valid(...listTypes).required(),
});

const CreateLocation = () => {
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

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

  const [floor, setFloor] = useState('');
  const [propertyType, setPropertyType] = useState('house');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setValidationErrors([]);
    setErrors({});

    const formData = {
      address: inputDataDireccion.address_complete,
      floor,
      propertyType,
      coordinates,
    };

    notes ? (formData.comment = notes) : null
    console.log(`[ ~ handleSubmit ~ formData]`, formData)

    const ho = createLocationSchema.validate(formData, { abortEarly: false });
    const error = ho.error;
    console.log(`[ ~ handleSubmit ~ ho ]`, ho)
    console.log(`[ ~ handleSubmit ~ error]`, error)
    if (error) {
      const formattedErrors = error.details.reduce((acc, curr) => ({ ...acc, [curr.context.key]: curr.message }), {});
      setErrors(formattedErrors);
      toast.error("Error en la validación del formulario");
      setLoading(false);
      return;
    }


    try {
      await locationsService.create(formData, token);

      toast.success('¡Ubicación creada exitosamente!');
      setSuccess(true);

      setFloor('');
      setPropertyType('');
      setNotes('');
      setCoordinates({});
      setInputDataDireccion({ address_complete: "", valid: false });

    } catch (err) {
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

            {validationErrors.length > 0 && (
              <Alert variant="danger">
                <ul>
                  {validationErrors.map((errMsg, index) => (
                    <li key={index}>{errMsg}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {isLoaded && (
              <MapComponent
                center={centerOrigin}
                stateCoordenadas={[coordinates, setCoordinates]}
                stateDireccion={[inputDataDireccion, setInputDataDireccion]}
                errors={[errors?.lat, errors.address]}
              />
            )}

            <TypeAndFloorInput
              floor={floor}
              setFloor={setFloor}
              errors={[errors.floor, errors.propertyType]}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
            />

            <NotesInput notes={notes} setNotes={setNotes} error={errors.notes} />

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
