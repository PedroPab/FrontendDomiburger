import { Button, Container, InputGroup, Form, Spinner } from 'react-bootstrap';
import LayoutAdmin from '../../Layout/Admin';
import PaginationComponent from '../../components/Pagination';
import { UserList } from './../../components/Users/UserList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UsersService } from '../../apis/clientV2/usersService';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailSearch, setEmailSearch] = useState('');
  const [filter, setFilter] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { token } = useAuth();
  const usersService = new UsersService(token);

  // Función para obtener los usuarios de la API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const limit = 12;
      const params = { page, limit };

      const data = await usersService.getAll(params, filter);
      setUsers(data?.body || []);
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
    fetchUsers();
  }, [page]);

  // Función para manejar el cambio de página
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <LayoutAdmin>
      <Container>
        <h1 className="mb-4 text-center">Administrar Usuarios</h1>

        {/* Buscador */}
        <InputGroup className="mb-4">
          <Form.Control
            type="text"
            placeholder="Buscar por email..."
            value={emailSearch}
            onChange={(e) => {
              setEmailSearch(e.target.value)
              setFilter({ key: 'email', value: e.target.value, option: '==' });
            }}
          />
          <Button variant="primary" onClick={fetchUsers}>
            <FaSearch />
          </Button>
        </InputGroup>

        {/* Mostrar Spinner mientras carga */}
        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {/* Lista de usuarios */}
        {!loading && <UserList users={users} error={error} />}

        {/* Pagination */}
        <PaginationComponent page={page} handlePageChange={handlePageChange} />
      </Container>
    </LayoutAdmin>
  );
};

export { AdminUser };
