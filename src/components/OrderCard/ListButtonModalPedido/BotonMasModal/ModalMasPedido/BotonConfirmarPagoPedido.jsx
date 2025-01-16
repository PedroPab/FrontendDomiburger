const BotonConfirmarPagoPedido = ({ data, handleClose }) => {
  const confirmarPago = () => {
    // lógica para confirmar pago
    handleClose();
  };

  return (
    <button onClick={confirmarPago}>
      Confirmar Pago
    </button>
  );
};

export default BotonConfirmarPagoPedido;
