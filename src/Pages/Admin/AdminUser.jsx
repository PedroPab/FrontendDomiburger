import { Container } from 'react-bootstrap';
import LayoutAdmin from '../../Layout/Admin';
import PaginationComponent from '../../components/Pagination';
import { UserList } from './../../components/Users/UserList'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UsersService } from '../../apis/clientV2/usersService';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'react-toastify';

const AdminUser = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [page, setPage] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);


  const { token } = useAuth()
  const usersService = new UsersService(token)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const limit = 12

        const data = await usersService.getAll({ page, limit });
        setUsers(data?.body);
        console.log(`[ ~ fetchOrders ~ data?.body]`, data?.body)

      } catch (error) {
        setError('Error fetching orders');
        toast.error('Error al cargar los pedidos');
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);


  return (
    <LayoutAdmin>
      <h1>dime? quires administrar los usuarios?</h1>
      <Container >

        <UserList
          users={users}
          loading={loading}
          error={error}
        />

        <PaginationComponent
          page={page}
          handlePageChange={(newPage) => setSearchParams({ page: newPage })}
        />

      </Container>
    </LayoutAdmin >
  );
}

export { AdminUser }