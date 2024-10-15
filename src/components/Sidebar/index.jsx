import { useContext } from 'react';
import { Link } from 'react-router-dom'; // Si estás usando React Router
import { MiContexto } from '../../Context';
import { RecepcionContexto } from '../../Context/RecepcionContex';
import { FaMotorcycle } from 'react-icons/fa';
import { DomiciliariosList } from './DomiciliariosList';

const Sidebar = () => {


  const contextRecepcion = useContext(RecepcionContexto)
  const context = useContext(MiContexto)

  const modoOscuro = context.modoOscuro

  const domiciliarios = contextRecepcion.listDomiciliarios

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3"
      // eslint-disable-next-line react/no-unknown-property
      bg={modoOscuro ? 'dark' : 'light'}
      style={{ width: '250px', height: '90vh' }}>
      <h4 className="text-center">Opciones</h4>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        <ul className="nav nav-pills flex-column mb-auto">

          <li className="nav-item">
            <Link to="/settings" className="nav-link">
              Configuración
            </Link>
          </li>

          <li className="nav-item"
            onClick={() => contextRecepcion.openCloseModalAgregarDo()}>
            <Link>
              <FaMotorcycle /> Domiciliarios
            </Link>
          </li>

          {/* lista de los avatares de los los domiciliarios */}
          <DomiciliariosList
            domiciliarios={domiciliarios}
          />



        </ul>
      </div>
    </div>
  );
};

export { Sidebar };
