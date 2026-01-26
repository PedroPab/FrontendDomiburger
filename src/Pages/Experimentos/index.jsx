import { useShowNotification } from "../../hooks/useShowNotification";


const Experimentos = () => {
  const { notify } = useShowNotification();

  const handleClick = () => {
    notify('Hola 👋', {
      body: 'Esta es una notificación desde el custom hook',
      icon: '/logo192.png'
    });
  };
  return (
    <div>
      <h1>Experimentos</h1>

      <button onClick={handleClick}>
        Enviar Notificación
      </button>

    </div >
  );
}

export default Experimentos 