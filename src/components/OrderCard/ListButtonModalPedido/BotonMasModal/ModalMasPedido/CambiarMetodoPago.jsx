const CambiarMetodoPago = ({ data, handleClose }) => {
  const cambiarMetodo = () => {
    // lógica para cambiar método de pago
    handleClose();
  };

  return (
    <button onClick={cambiarMetodo}>
      Cambiar Método de Pago
    </button>
  );
};

export default CambiarMetodoPago;
