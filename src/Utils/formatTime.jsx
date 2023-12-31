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


const convertirFecha = (fechaInput) => {
  var dateInput = fechaInput
  var fechaLocal = new Date(dateInput + "T00:00:00");

  // Ajustar la diferencia horaria a la hora internacional
  fechaLocal.setHours(fechaLocal.getHours());

  // Obtener la hora en formato UTC
  var fechaUTC = fechaLocal.toISOString();

  return fechaUTC
}


const convertirFecha2 = (fechaInput) => {
  var fechaLocal = new Date(fechaInput + "T00:00:00");

  // Ajustar la diferencia horaria a la hora internacional
  fechaLocal.setHours(fechaLocal.getHours());

  // Obtener la hora en formato UTC
  var fechaUTC = fechaLocal.toISOString();

  return fechaUTC
}

function convertirHoraDeUnixADate(tiempoUnix) {
  const rta = new Date(tiempoUnix._seconds * 1000 + tiempoUnix._nanoseconds / 1000000)
  return rta
}

export { formatTimeString, convertirFecha, convertirFecha2, convertirHoraDeUnixADate }