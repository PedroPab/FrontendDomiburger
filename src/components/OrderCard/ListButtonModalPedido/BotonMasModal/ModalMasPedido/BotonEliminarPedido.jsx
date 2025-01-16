const BotonEliminarPedido = ({ data, handleClose }) => {
  const eliminarPedido = () => {
    // lógica para eliminar pedido
    handleClose();
  };

  return (
    <button onClick={eliminarPedido}>
      Eliminar Pedido
    </button>
  );
};

export default BotonEliminarPedido;
