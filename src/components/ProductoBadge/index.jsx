const ProductoBadge = ({ cantidad, name, colorSecundary }) => {
  return (
    <span className="badge rounded-pill " style={{ backgroundColor: colorSecundary ?? 'black' }} >
      <big>{cantidad}</big>
      {name}
    </span >
  );
};

export { ProductoBadge }
