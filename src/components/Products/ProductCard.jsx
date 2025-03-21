
const ProductCard = ({ element }) => {
  return (
    <div className="card shadow-sm" style={{ width: '18rem' }}>
      {/* Mostrar la primera imagen si existe */}
      {element.photos && element.photos.length > 0 && (
        <img src={element?.photos[0] || null} className="card-img-top" alt={element.name} />
      )}

      <div className="card-body">
        <h5 className="card-title">{element.name}</h5>
        <p className="card-text text-muted">{element.description}</p>
        <p className="fw-bold text-primary">Precio: ${element.price.toFixed(2)}</p>

        {/* Estado del elemento */}
        <span className={`badge ${element.status === "active" ? "bg-success" : "bg-danger"}`}>
          {element.status}
        </span>

        {/* Información adicional */}
        <ul className="list-group list-group-flush mt-2">
          <li className="list-group-item"><strong>Tipo:</strong> {element.type}</li>
          <li className="list-group-item"><strong>Secreto:</strong> {element.secret ? "Sí" : "No"}</li>
        </ul>

        {/* Botón de acción */}
        <div className="mt-3">
          <a href="#" className="btn btn-primary w-100">Ver detalles</a>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
