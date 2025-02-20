import { useState } from 'react';
import Joi from 'joi';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ProductsService } from '../../apis/clientV2/ProductsService'; // Asegúrate de tener este servicio
import { useAuth } from '../../Context/AuthContext';
import LayoutAdmin from '../../Layout/Admin';
import { useNavigate } from 'react-router-dom';

// Esquema de validación con Joi
const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    'any.required': 'El nombre es obligatorio',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
  }),
  description: Joi.string().min(10).max(1000).required().messages({
    'any.required': 'La descripción es obligatoria',
    'string.min': 'La descripción debe tener al menos 10 caracteres',
  }),
  colorPrimary: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required().messages({
    'any.required': 'El color primario es obligatorio',
    'string.pattern.base': 'El color primario debe ser un código hexadecimal válido',
  }),
  colorSecondary: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).required().messages({
    'any.required': 'El color secundario es obligatorio',
    'string.pattern.base': 'El color secundario debe ser un código hexadecimal válido',
  }),
  photos: Joi.array().items(Joi.string().uri()).min(1).required().messages({
    'any.required': 'Debe incluir al menos una foto',
    'array.min': 'Debe incluir al menos una foto',
    'string.uri': 'Cada foto debe ser una URL válida',
  }),
  price: Joi.number().positive().required().messages({
    'any.required': 'El precio es obligatorio',
    'number.positive': 'El precio debe ser un número positivo',
  }),
  type: Joi.string().valid('product').required().messages({
    'any.required': 'El tipo es obligatorio',
    'any.only': 'El tipo debe ser "product"',
  }),
});

const CreateProduct = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [colorPrimary, setColorPrimary] = useState('');
  const [colorSecondary, setColorSecondary] = useState('');
  const [photos, setPhotos] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('product');

  const productService = new ProductsService(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrors({});

    const formData = {
      name,
      description,
      colorPrimary,
      colorSecondary,
      photos: photos.split(',').map((url) => url.trim()), // Convierte string a array
      price: parseFloat(price),
      type,
    };

    const validation = createProductSchema.validate(formData, { abortEarly: false });
    console.log(`[ ~ handleSubmit ~ validation]`, validation)

    if (validation.error) {
      const formattedErrors = validation.error.details.reduce(
        (acc, curr) => ({ ...acc, [curr.context.key]: curr.message }),
        {}
      );
      setErrors(formattedErrors);
      toast.error('Error en la validación del formulario');
      setLoading(false);
      console.log(validation.error);
      return;
    }

    try {
      await productService.create(formData);
      toast.success('¡Producto creado exitosamente!');

      // Resetear el formulario
      setName('');
      setDescription('');
      setColorPrimary('');
      setColorSecondary('');
      setPhotos('');
      setPrice('');
      setType('product');

      navigate(-1);
    } catch (err) {
      toast.error(`Error: ${err.message}`);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAdmin>
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h1 className="mb-4 text-center text-primary">Crear Nuevo Producto</h1>

            {error && <Alert variant="danger">Error: {error.message}</Alert>}

            {/* Campo Nombre */}
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre del Producto</label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Producto de prueba"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* Campo Descripción */}
            <div className="mb-3">
              <label className="form-label fw-bold">Descripción</label>
              <textarea
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Este es un producto de prueba..."
              />
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>

            {/* Campo Color Primario */}
            <div className="mb-3">
              <label className="form-label fw-bold">Color Primario</label>
              <input
                type="text"
                className={`form-control ${errors.colorPrimary ? 'is-invalid' : ''}`}
                value={colorPrimary}
                onChange={(e) => setColorPrimary(e.target.value)}
                placeholder="Ej: #444401"
              />
              {errors.colorPrimary && <div className="invalid-feedback">{errors.colorPrimary}</div>}
            </div>

            {/* Campo Color Secundario */}
            <div className="mb-3">
              <label className="form-label fw-bold">Color Secundario</label>
              <input
                type="text"
                className={`form-control ${errors.colorSecondary ? 'is-invalid' : ''}`}
                value={colorSecondary}
                onChange={(e) => setColorSecondary(e.target.value)}
                placeholder="Ej: #66585"
              />
              {errors.colorSecondary && <div className="invalid-feedback">{errors.colorSecondary}</div>}
            </div>

            {/* Campo Fotos */}
            <div className="mb-3">
              <label className="form-label fw-bold">Fotos (URLs separadas por comas)</label>
              <input
                type="text"
                className={`form-control ${errors.photos ? 'is-invalid' : ''}`}
                value={photos}
                onChange={(e) => setPhotos(e.target.value)}
                placeholder="Ej: https://example.com/photo1.jpg, https://example.com/photo2.jpg"
              />
              {errors.photos && <div className="invalid-feedback">{errors.photos}</div>}
            </div>

            {/* Campo Precio */}
            <div className="mb-3">
              <label className="form-label fw-bold">Precio</label>
              <input
                type="number"
                className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ej: 19.99"
              />
              {errors.price && <div className="invalid-feedback">{errors.price}</div>}
            </div>

            <div className="d-flex justify-content-center mt-4 mb-4">
              <Button variant="primary" onClick={handleSubmit} size="lg" disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Crear Producto'}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </LayoutAdmin>
  );
};

export { CreateProduct };
