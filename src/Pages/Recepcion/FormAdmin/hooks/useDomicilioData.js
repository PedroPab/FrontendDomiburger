
import { useEffect, useState } from 'react';
import { obtenerDistancia } from '../googleDistanceMatrix';
import { calcularPrecio, calcularTiempo } from '../../../Utils/matrixCalculate';
import { toast } from 'react-toastify';

const useDomicilioData = (isLoaded, inputDataDireccion, coordinates, setPrevCoordinates, setDataDomicilio, centerOrigin) => {
  const [prevCoordinates, setPrevCoordinates] = useState(null);

  useEffect(() => {
    if (!isLoaded) {
      console.log('Cargando Google Maps...');
      return;
    }

    if (!inputDataDireccion.valid || !coordinates) return;

    if (prevCoordinates && prevCoordinates.lat === coordinates.lat && prevCoordinates.lng === coordinates.lng) return;
    setPrevCoordinates(coordinates);

    obtenerDistancia(centerOrigin, coordinates)
      .then(dataMatrix => {
        if (dataMatrix) {
          const timeText = calcularTiempo(dataMatrix.distance.value);
          const price = calcularPrecio(dataMatrix.distance.value);
          if (!timeText || (!price && price !== 0)) return toast.error('No se pudo calcular el precio del domicilio');

          toast.success(`El domicilio tiene un costo de $${price} y tardará ${timeText}`);

          setDataDomicilio({
            timeText,
            price
          });
        }
      })
      .catch(error => toast.error(error));
  }, [isLoaded, inputDataDireccion, coordinates, prevCoordinates, setPrevCoordinates, setDataDomicilio, centerOrigin]);
};

export default useDomicilioData;