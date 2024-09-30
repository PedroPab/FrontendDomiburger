import { obtenerDistancia } from './../googleDistanceMatrix';
import { calcularTiempo, calcularPrecio } from '../../../Utils/matrixCalculate';
import { useEffect } from 'react';

export const useCalcularDomicilio = (coordinates, inputDataDireccion, setDataDomicilio) => {
  const centerOrigin = { lat: 6.3017314, lng: -75.5743796 };

  useEffect(() => {
    if (!inputDataDireccion.valid || !coordinates) return;

    obtenerDistancia(centerOrigin, coordinates)
      .then(dataMatrix => {
        if (dataMatrix) {
          const timeText = calcularTiempo(dataMatrix.distance.value);
          const price = calcularPrecio(dataMatrix.distance.value);
          setDataDomicilio({ timeText, price });
        }
      })
      .catch(error => console.error(error));
  }, [coordinates, inputDataDireccion, setDataDomicilio]);
};
