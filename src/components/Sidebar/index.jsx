import { Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import SidebarElementDelivery from './SidebarElement';
import { RecepcionContexto } from '../../Context/RecepcionContex';
import InfoButton from '../InfoButton';

const Sidebar = () => {
  // Accedemos al contexto, incluyendo la variable que controlará la visibilidad del sidebar.
  const contextRecepcion = useContext(RecepcionContexto);
  const { openSidebarFilterDelivery } = contextRecepcion;

  // Estado local para manejar qué sección está abierta.
  const [openSection, setOpenSection] = useState('dashboard');

  const handleToggle = (section) => {
    // Si la sección ya está abierta, la cerramos y removemos el filtro;
    // de lo contrario, la abrimos y establecemos el domiciliario correspondiente.
    setOpenSection(openSection === section ? '' : section);
    if (openSection === section) {
      contextRecepcion.setDomiciliarioIdFilter(null);
      return;
    }
    contextRecepcion.setDomiciliarioIdFilter(section);
  };

  // Si openSidebarFilterDelivery es false, no renderizamos el Sidebar.
  if (!openSidebarFilterDelivery) {
    return null;
  }

  return (
    <Col xs={3} md={2} className="vh-90 p-3 border-end">
      <div className="position-relative">
        <h3 className="text-center border-bottom pb-2 mb-3">
          Filtrar por domiciliario
        </h3>
        <InfoButton textInfo={'Selecciona un domiciliario para ver sus pedidos'} />
      </div>

      <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
        <ul className="list-unstyled">
          {contextRecepcion.listDomiciliarios.map((domiciliario) => (
            <SidebarElementDelivery
              key={domiciliario.id}
              handleToggle={handleToggle}
              openSection={openSection}
              title={domiciliario.name}
              eventKey={domiciliario.id}
              imageUrl={`https://i.pravatar.cc/150?img=${domiciliario.id}`}
            />
          ))}

          <SidebarElementDelivery
            handleToggle={handleToggle}
            openSection={openSection}
            title={'Ninguno'}
            eventKey={'ninguno'}
            imageUrl={`https://i.pravatar.cc/150?img=${10}`}
          />

          {/* Botón para agregar nuevos domiciliarios */}
          <li className="mt-3">
            <div className="position-relative">
              <button
                className="btn btn-success w-100"
                onClick={() => contextRecepcion.openCloseModalAgregarDo()}
              >
                Agregar domiciliario
              </button>
              <InfoButton
                color="muted"
                textInfo="Es posible que no tengas todos los domiciliarios que trabajan hoy. Agregados manualmente."
              />
            </div>
          </li>
        </ul>
      </div>
    </Col>
  );
};

export default Sidebar;
