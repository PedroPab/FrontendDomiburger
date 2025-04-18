import { useState } from "react";
import { RoleList } from "../RoleList";
import EditRolesModal from "./EditRolesModal";
import { UsersService } from "../../apis/clientV2/usersService";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { EditAssignedKitchensModal } from "./EditAssignedKitchensModal";

const UserCard = ({ element }) => {
	const { token } = useAuth();
	const usersService = new UsersService(token);

	const [modalUpdateRole, setModalUpdaterRole] = useState(false);
	const [selectedRoles, setSelectedRoles] = useState(element?.roles || []);
	const [selectedKitchens, setSelectedKitchens] = useState(element?.assignedKitchens || []);
	const [modalUpdateKitchens, setModalUpdateKitchens] = useState(false);
	const [loading, setLoading] = useState(false); // Estado de carga

	const toggleModal = () => setModalUpdaterRole(prev => !prev);
	const toggleAssignedKitchensModal = () => setModalUpdateKitchens(prev => !prev);


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

	const onUpdateKitchens = async (id, kitchenIds) => {
		setLoading(true); // Iniciar carga
		try {
			await usersService.updateAssignedKitchens(id, kitchenIds);
			toast.success("Cocinas actualizadas correctamente");
			setSelectedKitchens(kitchenIds);
		}
		catch (error) {
			toast.error(error.message);
		}
		finally {
			setLoading(false); // Terminar carga
			toggleAssignedKitchensModal();
		}
	}
	return (
		<div className="card shadow-sm border-0 rounded-3 mx-auto position-relative" >
			{/* Spinner de carga */}
			{loading && (
				<div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded-3">
					<div className="spinner-border text-primary" role="status">
						<span className="visually-hidden">Cargando...</span>
					</div>
				</div>
			)}

			{element?.photoUrl ? (
				<img src={element?.photoUrl} alt={element?.name} className="card-img-top rounded-top" />
			) : (
				<div className="bg-light d-flex align-items-center justify-content-center" style={{ height: "150px" }}>
					<span className="text-muted">Sin imagen</span>
				</div>
			)}
			<div className="card-body text-center">
				<h5 className="card-title mb-1">{element?.name}</h5>
				<p className="text-muted small">ID: {element?.id}</p>
				<p className="mb-1"><strong>Email:</strong> {element?.email}</p>
				{element?.phone && <p className="mb-1"><strong>Teléfono:</strong> {element?.phone}</p>}
				<strong className="text-muted small">Roles: {element?.roles && <RoleList roles={element.roles} />}</strong>
				<strong className="text-muted small">Cocinas: {element?.assignedKitchens && element.assignedKitchens.join(", ")}</strong>

				<div className="d-flex justify-content-center gap-2 mt-3">
					<button className="btn btn-outline-primary btn-sm" disabled={loading}>Ver Perfil</button>
					<button onClick={toggleModal} className="btn btn-primary btn-sm" disabled={loading}>
						{loading ? (
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						) : (
							"Editar Roles"
						)}
					</button>
					<button onClick={toggleAssignedKitchensModal} className="btn btn-primary btn-sm" disabled={loading}>
						{loading ? (
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						) : (
							"Editar Cocinas"
						)}
					</button>
				</div>
			</div>

			<EditRolesModal
				show={modalUpdateRole}
				handleClose={toggleModal}
				userRoles={selectedRoles}
				onSave={(roles) => onUpdateRoles(element.id, roles)}
				isLoading={loading} // Pasamos el estado de carga al modal
			/>

			<EditAssignedKitchensModal
				show={modalUpdateKitchens}
				handleClose={toggleAssignedKitchensModal}
				assignedKitchens={selectedKitchens}
				onSave={(kitchenIds) => onUpdateKitchens(element.id, kitchenIds)}
				isLoading={loading} // Pasamos el estado de carga al modal
			/>
		</div>
	);
};

export { UserCard };
