import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const actualizarCuentaRegresiva = () => {
      const ahora = new Date();
      const tiempoRestante = targetTime - ahora;

      if (tiempoRestante <= 0) {
        setTimeRemaining('¡Ya hemos abierto!');
        return;
      }

      const horas = Math.floor(tiempoRestante / (1000 * 60 * 60));
      const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

      setTimeRemaining(`${horas}h ${minutos}m ${segundos}s`);
    };

    actualizarCuentaRegresiva();
    const intervalo = setInterval(actualizarCuentaRegresiva, 1000);

    return () => clearInterval(intervalo); // Limpiar intervalo al desmontar
  }, [targetTime]);

  return <>{timeRemaining}</>;
};

export default CountdownTimer;
