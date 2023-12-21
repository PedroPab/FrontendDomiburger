import './style.css'; // Asumiendo que los estilos se encuentran en Timeline.css

const Timeline = ({ datos }) => {
  // Función para convertir segundos a un objeto Date
  const toDate = (seconds) => new Date(seconds * 1000);

  // Función para calcular diferencias de tiempo en minutos
  const calculateDifferences = (statusArray) => {
    return statusArray.map((status, index, array) => {
      let prevTime = index > 0 ? toDate(array[index - 1].date?._seconds || array[index - 1].nowDate?._seconds) : toDate(array[0].date?._seconds || array[0].nowDate?._seconds);
      let currentTime = toDate(status.date?._seconds || status.nowDate?._seconds);
      let timeDiff = (currentTime - prevTime) / (60 * 1000); // Diferencia en minutos

      return {
        ...status,
        timeDiff: index === 0 ? 0 : timeDiff // El primer elemento no tiene diferencia
      };
    });
  };

  const statusWithDifferences = calculateDifferences(datos);

  return (
    <div className="timeline-container">
      {statusWithDifferences.map((status, index) => (
        <div key={index} className="timeline-item" style={{ marginTop: `${status.timeDiff * 2}px` }}>
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <p>Estado: {status.estado}</p>
            <p>Responsable: {status.responsable}</p>
            {/* Aquí puedes añadir más detalles si es necesario */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
