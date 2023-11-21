import { useRef } from 'react';
import { useContext } from 'react';
import { MiContexto } from '../../Context'

const AlertaConSonido = () => {
  const context = useContext(MiContexto)
  const alertaActiva = context.alertaActiva
  const setAlertaActiva = context.setAlertaActiva

  const audioRef = useRef();

  const activarAlerta = () => {
    setAlertaActiva(true);
    audioRef.current.play(); // Reproducir el sonido
  };

  return (
    <div>
      {alertaActiva && <p>¡Alerta activada!</p>}
      <button onClick={activarAlerta}>Activar Alerta</button>
      <audio ref={audioRef} src="URL_DEL_ARCHIVO_DE_AUDIO.mp3" preload="auto" />
    </div>
  );
};

export default AlertaConSonido;
