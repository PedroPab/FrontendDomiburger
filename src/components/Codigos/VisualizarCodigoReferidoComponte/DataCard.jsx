import { FaEllipsisV, FaUsers, FaAward, FaCalendarAlt } from 'react-icons/fa';

const DataCard = ({ id, referralsCount, awardsCount, creationDate }) => {
  // Función para manejar el clic en el botón de más opciones
  const handleMoreOptionsClick = () => {
    console.log('Mostrando más opciones...');
    // Aquí podrías implementar la lógica para mostrar más opciones, como un menú contextual.
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', margin: '10px', position: 'relative' }}>
      <button onClick={handleMoreOptionsClick} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', background: 'none' }}>
        <FaEllipsisV />
      </button>
      <div><strong>ID:</strong> {id}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <FaUsers /><span><strong>Referidos:</strong> {referralsCount}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <FaAward /><span><strong>Premios:</strong> {awardsCount}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <FaCalendarAlt /><spam><strong>Fecha de Creación:</strong> {creationDate}</spam>
      </div>
    </div>
  );
};

export default DataCard;
