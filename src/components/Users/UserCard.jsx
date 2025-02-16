import { useState } from "react";
import { RoleList } from "../RoleList";
import EditRolesModal from "./EditRolesModal";
import { UsersService } from "../../apis/clientV2/usersService";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const UserCard = ({ user }) => {
  console.log(`[ ~ UserCard ~ user]`, user)
  const { token } = useAuth();
  const usersService = new UsersService(token);

  const [modalUpdateRole, setModalUpdaterRole] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState(user?.roles || []);
  const [loading, setLoading] = useState(false); // Estado de carga

  const toggleModal = () => setModalUpdaterRole(prev => !prev);

  const onUpdateRoles = async (id, roles) => {
    setLoading(true); // Iniciar carga
    try {
      await usersService.updateRole(id, roles);
      toast.success("Roles actualizados correctamente");
      setSelectedRoles(roles);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Terminar carga
      toggleModal();
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3 mx-auto position-relative" style={{ maxWidth: "400px" }}>
      {/* Spinner de carga */}
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {user?.photoUrl ? (
        <img src={user?.photoUrl} alt={user?.name} className="card-img-top rounded-top" />
      ) : (
        <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "150px" }}>
          <span className="text-muted">Sin imagen</span>
        </div>
      )}
      <div className="card-body text-center">
        <h5 className="card-title mb-1">{user?.name}</h5>
        <p className="text-muted small">ID: {user?.id}</p>
        <p className="mb-1"><strong>Email:</strong> {user?.email}</p>
        {user?.phone && <p className="mb-1"><strong>Teléfono:</strong> {user?.phone}</p>}
        <p className="text-muted small">Roles: {user?.roles && <RoleList roles={user.roles} />}</p>

        <div className="d-flex justify-content-center gap-2 mt-3">
          <button className="btn btn-outline-primary btn-sm" disabled={loading}>Ver Perfil</button>
          <button onClick={toggleModal} className="btn btn-primary btn-sm" disabled={loading}>
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Editar Roles"
            )}
          </button>
        </div>
      </div>

      <EditRolesModal
        show={modalUpdateRole}
        handleClose={toggleModal}
        userRoles={selectedRoles}
        onSave={(roles) => onUpdateRoles(user.id, roles)}
        isLoading={loading} // Pasamos el estado de carga al modal
      />
    </div>
  );
};

export { UserCard };
