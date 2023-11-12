const ProductoBadge = ({ cantidad, name, colorSecondary }) => {
  return (
    <span
      className="badge rounded-pill "
      style={{ backgroundColor: colorSecondary ?? 'black' }}
    >
      <big>{cantidad}</big>
      {name}
    </span >
  );
};

export { ProductoBadge }
