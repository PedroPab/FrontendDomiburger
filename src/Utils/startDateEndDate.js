const startDateEndDate = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

  return [startDate.toISOString(), endDate.toISOString()];
}


// Función auxiliar para convertir una fecha expresada en hora local de Colombia a hora UTC.
// Colombia está en UTC-5, por lo que para obtener la hora UTC se suma 5 horas.
function colombiaLocalToUTC(year, month, day, hour, minute, second) {
  return new Date(Date.UTC(year, month, day, hour + 5, minute, second));
}

// Función que devuelve el rango (inicio y fin) del día en hora internacional (UTC)
// Asume que el día en Colombia comienza a la 1:00 AM y finaliza a la 1:00 AM del día siguiente.
function getRangoDiaInternacional(fechaInput) {
  // Convertir la entrada a objeto Date (por ejemplo, '2025-03-30')
  const fecha = new Date(fechaInput);

  // Extraer año, mes y día
  const year = fecha.getFullYear();
  const month = fecha.getMonth(); // Meses: 0 para enero hasta 11 para diciembre
  const day = fecha.getDate();

  // Hora de inicio en Colombia: 1:00 AM
  const inicioUTC = colombiaLocalToUTC(year, month, day, 1, 0, 0);

  // Hora de finalización en Colombia: 1:00 AM del día siguiente
  const finUTC = colombiaLocalToUTC(year, month, day + 1, 1, 0, 0);

  return {
    start: inicioUTC,
    end: finUTC
  };
}

export { startDateEndDate, getRangoDiaInternacional }
