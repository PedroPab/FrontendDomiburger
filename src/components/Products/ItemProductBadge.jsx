const ItemProductBadge = ({ name, color }) => {
  return (
    <span
      style={{ backgroundColor: color }}
      className="badge m-1">
      {name}
    </span>
  );
}

export { ItemProductBadge };