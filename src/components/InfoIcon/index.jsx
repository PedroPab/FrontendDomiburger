// InfoIcon recibe el Icono como componente, un título y el número correspondiente
const InfoIcon = ({ Icon, title, number }) => {
  return (
    <div className="  ">
      <Icon />
      <span>{title}: <strong>{number}</strong></span>
    </div>
  );
};

export default InfoIcon;
