// googleDistanceMatrix.js
export const calcularDataMatrix = async (origen, destino) => {
  return new Promise((resolve, reject) => {
    if (!window.google) {
      reject('Google Maps no está disponible');
      return;
    }
    console.log('Calculando distancia...');

    const service = new window.google.maps.DistanceMatrixService();
    const travelMode = window.google.maps.TravelMode.DRIVING; // Modo de transporte

    service.getDistanceMatrix(
      {
        origins: [origen], // Coordenadas de origen
        destinations: [destino], // Coordenadas de destino
        travelMode: travelMode,
        unitSystem: window.google.maps.UnitSystem.METRIC, // Unidades métricas
        avoidHighways: false,
        avoidTolls: false,
        durationInTraffic: true, // Incluir tráfico
        // tener en cuenta que si pones la hora del pc en el pasado te va a dar un error
      },
      (response, status) => {
        if (status === 'OK') {
          const result = response.rows[0].elements[0];
          resolve(result);
        } else {
          console.log('Error con la API de Distance Matrix, los datos enviados son:', origen, destino, status, travelMode, response);
          reject(`Error con la API de Distance Matrix: ${status}`);
        }
      }
    );
  });
};

export const obtenerDistancia = async (origen, destino) => {
  try {
    const dataMatrix = await calcularDataMatrix(origen, destino);
    return dataMatrix
  } catch (error) {
    console.error('Error al obtener distancia:', error);
    throw error;
  }
};
