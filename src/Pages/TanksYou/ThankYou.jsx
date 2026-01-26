import Confetti from '../../components/Confetti';
import imgGracias from '../../assets/img/catWithHeart.jpg';
import { useNavigate } from 'react-router-dom';
import { UserLayout } from '../../Layout/UserLayout';
import { DisabledComponent } from '../../components/common/DisabledComponent';

const ThankYou = () => {
  const navigate = useNavigate()

  return (
    <UserLayout>

      {/* Contenido Principal */}
      <div className="container text-center my-5">
        {/* Imagen de Agradecimiento */}
        <img
          src={imgGracias}
          alt="Un gato dando un corazón como lo coreanos Gracias"
          className="img-fluid mb-4 shadow-lg rounded"
          style={{ maxWidth: '250px' }}
        />

        {/* Mensaje Principal */}
        <h1 className="display-4 fw-bold mb-3 text-success">¡Gracias por tu compra!</h1>
        <p className="lead text-muted">
          Tu pedido ha sido recibido y está siendo procesado.
        </p>
        <p className="text-muted">
          Te notificaremos cuando tu pedido esté en camino. Mientras tanto, puedes
          revisar los detalles del pedido o explorar otros productos.
        </p>

        {/* Botones de Acción */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <DisabledComponent message={'Próximamente'}>
            <button
              disabled
              className="btn btn-primary btn-lg shadow"
              onClick={() =>
                navigate(`/mi-pedido`)
              }
            >
              Ver detalles del pedido
            </button>
          </DisabledComponent>
          <button
            className="btn btn-outline-secondary btn-lg shadow"
            onClick={() =>
              navigate(`/`)
            }					>
            Seguir explorando
          </button>
        </div>

        {/* Efecto de Confeti */}
        <Confetti />
      </div>
    </UserLayout>
  );
};

export default ThankYou;
