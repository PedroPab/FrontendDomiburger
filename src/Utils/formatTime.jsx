function formatTimeString(timestamp) {
  // Convertir el timestamp a milisegundos y crear un objeto Date
  const date = new Date(timestamp._seconds * 1000);

  // Formatear la hora y minutos
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convertir de 24h a 12h formato y ajustar las horas '0' a '12'
  hours = hours % 12;
  hours = hours ? hours : 12; // La hora '0' debe ser '12'

  // Asegurarse de que los minutos sean dos dígitos
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  // Formatear la hora final
  return `${hours}:${minutesStr} ${ampm}`;
}

export { formatTimeString }