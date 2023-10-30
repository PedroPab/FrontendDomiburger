
const EstadoPago = ({ pagado }) => {
  return (
    <div>
      {pagado ? (
        <p>El pedido ha sido pagado ✅</p>
      ) : (
        <p>El pedido aún no ha sido pagado ❌</p>
      )}
    </div>
  );
};

export { EstadoPago };
