
const RoleList = ({ roles }) => {
  if (!roles || roles.length === 0) {
    return <p className="text-muted">Sin roles asignados</p>;
  }

  return (
    <div className="d-flex flex-wrap gap-2" >
      {
        roles.map((role) => (
          <span key={role} className="badge bg-warning px-3 py-2 text-white">
            {role}
          </span>
        ))
      }
    </div>
  );
};

export { RoleList };
