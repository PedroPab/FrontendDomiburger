import { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MiContexto } from '../../Context';
import LayoutCliente from '../../Layout/LayoutCliente';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import Confetti from '../../components/Confetti'


const ThankYou = () => {
  const context = useContext(MiContexto)

  const verDetallesPedido = () => {
    // Lógica para ver detalles del pedido
  }

  return (
    <>
      <LayoutCliente>

        <NavbarCliente
          modoOscuro={context.modoOscuro}
          alternarModo={context.alternarModo}
        />

        <div className="container text-center my-5">
          <img src="/ruta/a/imagen-de-agradecimiento.jpg" alt="Gracias" className="img-fluid mb-4" />
          <h1 className="display-4">¡Gracias por tu compra!</h1>
          <p className="lead">Tu pedido ha sido recibido y está siendo procesado.</p>
          <p>Te notificaremos cuando tu pedido esté en camino.</p>
          <button onClick={verDetallesPedido} className="btn btn-primary mt-3">Ver detalles del pedido</button>
          <Confetti />
        </div>
      </LayoutCliente>
    </>
  )
}

export default ThankYou