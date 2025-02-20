
const ProductCard = ({ product }) => {
  return (
    <div className="card shadow-sm" style={{ width: '18rem' }}>
      {/* Mostrar la primera imagen si existe */}
      {product.photos && product.photos.length > 0 && (
        <img src={product.photos[0]} className="card-img-top" alt={product.name} />
      )}

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.description}</p>
        <p className="fw-bold text-primary">Precio: ${product.price.toFixed(2)}</p>

        {/* Estado del producto */}
        <span className={`badge ${product.status === "active" ? "bg-success" : "bg-danger"}`}>
          {product.status}
        </span>

        {/* Información adicional */}
        <ul className="list-group list-group-flush mt-2">
          <li className="list-group-item"><strong>Tipo:</strong> {product.type}</li>
          <li className="list-group-item"><strong>Secreto:</strong> {product.secret ? "Sí" : "No"}</li>
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
