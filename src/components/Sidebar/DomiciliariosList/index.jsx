
const DomiciliariosList = ({ domiciliarios }) => {
  return (
    <ul className="list-group">
      {domiciliarios && domiciliarios.map((domiciliario, index) => {
        const img = domiciliario?.img || 'https://i.pravatar.cc/150';

        return (
          <li key={index} className="list-group-item d-flex align-items-center">
            <img
              src={img}
              alt={`Foto de ${domiciliario.name}`}
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            />
            <div className="d-flex flex-column">
              <strong>{domiciliario.name}</strong>
              <small>Pedidos asignados: {domiciliario?.pedidosAsignados || 5}</small>
              <small>Estado: {domiciliario?.state || 'Active'}</small>

            </div>
          </li>
        );
      })}
    </ul>
  );
};

export { DomiciliariosList };
