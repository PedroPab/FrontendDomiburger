import { useContext } from 'react';
import { MiContexto } from '../../Context';
import LayoutCliente from '../../Layout/LayoutCliente';
import { NavbarCliente } from '../../components/Navbar/NavbarCliente';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ProductoList } from '../../components/OrderCard/ProductoList';
import formatearNumeroConPuntos from '../../Utils/formatearNumeroConPuntos';
import { Link } from 'react-router-dom';
import img from '../../assets/img/Wtf.jpg'

const MiPedido = () => {
  const context = useContext(MiContexto);
  const [storedOrder] = useLocalStorage('order', {});
  console.log(`[ ~ MiPedido ~ storedOrder]`, storedOrder);

  const { name, phone, address, priceTotal, estado, order } = storedOrder;

  return (
    <LayoutCliente>
      <NavbarCliente
        modoOscuro={context.modoOscuro}
        alternarModo={context.alternarModo}
      />

      <div className="container my-5">
        {/* Encabezado */}
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-success">Mi Pedido</h1>
          <p className="text-muted fs-5">
            Aquí encontrarás los detalles de tu pedido.
          </p>
        </div>

        {/* Resumen del Pedido */}
        {Object.keys(storedOrder).length > 0 ? (
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-body">
              <h2 className="card-title text-primary">Resumen del Pedido</h2>
              <hr />
              <p className="card-text mb-2">
                <strong>Nombre:</strong> {name || 'No disponible'}
              </p>
              <p className="card-text mb-2">
                <strong>Teléfono:</strong> {phone || 'No disponible'}
              </p>
              <p className="card-text mb-2">
                <strong>Dirección:</strong> {address?.address_complete || 'No disponible'}
              </p>
              <p className="card-text mb-2">
                <strong>Total a Pagar:</strong>{' '}
                <span className="text-success fw-bold">{formatearNumeroConPuntos(priceTotal?.priceTotal) || 'No disponible'}</span>
              </p>
              <p className="card-text mb-2">
                <strong>Estado:</strong>{' '}
                <span className={`badge ${estado === 'Calientes' ? 'bg-danger' : 'bg-secondary'}`}>
                  {estado || 'No disponible'}
                </span>
              </p>
              <ProductoList productos={order} />
            </div>
          </div>
        ) : (
          <div className="text-center">
            {/* Espacio para imagen cómica */}
            <img
              src={img} // Reemplazar con la ruta de la imagen
              alt="Sin pedido"
              className="img-fluid mb-4"
              style={{ maxWidth: '90%', borderRadius: '8px' }}
            />
            <p className="text-muted fs-5 mb-4">
              ¡Ups! Parece que no tienes ningún pedido aún.
            </p>
            {/* Botón para volver al inicio */}
            <Link to="/" className="btn btn-primary btn-lg">
              Pedir Ahora :)
            </Link>
          </div>
        )}
      </div>
    </LayoutCliente>
  );
};

export default MiPedido;
