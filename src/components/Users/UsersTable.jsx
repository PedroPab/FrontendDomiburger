import { Table, Button, Spinner } from 'react-bootstrap';
import { FaEye, FaEdit } from 'react-icons/fa';
import { RoleList } from '../RoleList';

const UsersTable = ({ users, loading, onViewDetails, onEditUser }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando usuarios...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        No se encontraron usuarios
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="align-middle">{index + 1}</td>
              <td className="align-middle">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="bg-secondary d-flex align-items-center justify-content-center text-white"
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                  >
                    {user.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}
              </td>
              <td className="align-middle">{user.name || 'Sin nombre'}</td>
              <td className="align-middle">{user.email}</td>
              <td className="align-middle">{user.phone || '-'}</td>
              <td className="align-middle">
                <RoleList roles={user.roles} />
              </td>
              <td className="align-middle">
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={() => onViewDetails(user)}
                    title="Ver detalles"
                  >
                    <FaEye />
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEditUser(user)}
                    title="Editar usuario"
                  >
                    <FaEdit />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export { UsersTable };
