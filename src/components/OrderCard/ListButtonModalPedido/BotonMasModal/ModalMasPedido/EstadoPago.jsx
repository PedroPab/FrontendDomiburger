const EstadoPago = ({ pagado }) => {
  return (
    <div>
      {pagado ? 'Pagado' : 'Pendiente de pago'}
    </div>
  );
};

export default EstadoPago;
