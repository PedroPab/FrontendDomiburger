import { useState } from "react";
import ReusableModal from "../common/ReusableModal";
import { ROLES } from "../../Utils/const/roles";

const EditRolesModal = ({ show, handleClose, userRoles, onSave, isLoading }) => {
  const availableRoles = Object.values(ROLES).map((role) => role.name);

  const selectRoleByName = (nameRole) => {
    return Object.values(ROLES).find(role => role.name === nameRole)?.value || null;
  };

  const [selectedRoles, setSelectedRoles] = useState(userRoles || []);

  const handleRoleChange = (nameRole) => {
    const roleValue = selectRoleByName(nameRole);
    if (!roleValue) return;

    setSelectedRoles(prevRoles =>
      prevRoles.includes(roleValue)
        ? prevRoles.filter(role => role !== roleValue)
        : [...prevRoles, roleValue]
    );
  };

  return (
    <ReusableModal show={show} handleClose={handleClose} title="Editar Roles">
      <div className="p-3">
        <p className="mb-3">Selecciona los roles para este usuario:</p>
        {availableRoles.map((role) => (
          <div key={role} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={`role-${role}`}
              checked={selectedRoles.includes(selectRoleByName(role))}
              onChange={() => handleRoleChange(role)}
              disabled={isLoading} // Deshabilitar mientras carga
            />
            <label className="form-check-label" htmlFor={`role-${role}`}>
              {role}
            </label>
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <button className="btn btn-secondary" onClick={handleClose} disabled={isLoading}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={() => onSave(selectedRoles)} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Guardando...
            </>
          ) : (
            "Guardar"
          )}
        </button>
      </div>
    </ReusableModal>
  );
};

export default EditRolesModal;
