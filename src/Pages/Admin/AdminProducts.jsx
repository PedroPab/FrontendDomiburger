import { Button, Container, InputGroup, Form, Spinner, Row, Col } from 'react-bootstrap';
import LayoutAdmin from '../../Layout/Admin';
import PaginationComponent from '../../components/Pagination';
import { UserList } from './../../components/Products/UserList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductsService } from '../../apis/clientV2/productsService';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailSearch, setEmailSearch] = useState('');
  const [filter, setFilter] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { token } = useAuth();
  const productsService = new ProductsService(token);

  // Función para obtener los usuarios de la API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const limit = 12;
      const params = { page, limit };

      const data = await productsService.getAll(params, filter);
      setProducts(data?.body || []);
    } catch (error) {
      setError('Error al cargar los usuarios');
      toast.error('Error al cargar los usuarios');
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar la búsqueda cuando cambia la página o el filtro
  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <LayoutAdmin>
      <Container fluid className="px-4">
        {/* Título */}
        <Row className="mb-4">
          <Col>
            <h1 className="text-primary fw-bold text-center">Administrar Usuarios</h1>
          </Col>
        </Row>

        {/* Buscador */}
        <Row className="mb-4 justify-content-center">
          <Col md={6} lg={4}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar por email..."
                value={emailSearch}
                onChange={(e) => {
                  setEmailSearch(e.target.value);
                  setFilter({ key: 'email', value: e.target.value, option: '==' });
                }}
              />
              <Button variant="primary" onClick={fetchProducts}>
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
        </Row>

        {/* Contenido */}
        <Row>
          <Col>
            {/* Spinner mientras carga */}
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <UserList products={products} error={error} />
            )}
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <PaginationComponent page={page} handlePageChange={handlePageChange} />
          </Col>
        </Row>
      </Container>
    </LayoutAdmin>
  );
};

export { AdminProducts };
