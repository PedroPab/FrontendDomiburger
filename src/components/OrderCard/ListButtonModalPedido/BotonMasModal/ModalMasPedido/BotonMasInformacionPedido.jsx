const BotonMasInformacionPedido = ({ data, handleClose }) => {
  const mostrarMasInformacion = () => {
    // lógica para mostrar más información
    handleClose();
  };

  return (
    <button onClick={mostrarMasInformacion}>
      Más Información
    </button>
  );
};

export default BotonMasInformacionPedido;
