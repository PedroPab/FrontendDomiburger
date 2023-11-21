import { toast } from 'react-toastify';

const useNotificacionConSonido = () => {
  const sonido = new Audio('./alert.mp3');

  const mostrarNotificacion = (mensaje) => {
    sonido.play();
    toast(mensaje);
  };

  return mostrarNotificacion;
};

export default useNotificacionConSonido;
