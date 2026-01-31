import { Col } from 'react-bootstrap';
import { useState } from 'react';
import SidebarElementDelivery from './SidebarElement';
import { useRecepcion } from '../../Context/RecepcionContex';
import InfoButton from '../InfoButton';
import imageDefault from "../../assets/img/photoGeneric.jpg";

const Sidebar = () => {
  // Accedemos al contexto para obtener la visibilidad del sidebar y demás funciones
  const {
    openSidebarFilterDelivery,
    setDomiciliarioIdFilter,
    openCloseModalAgregarDo,
    listDomiciliarios
  } = useRecepcion();

  // Estado local para saber qué sección (domiciliario) está activa
  const [openSection, setOpenSection] = useState('dashboard');

  const handleToggle = (section) => {
    // Si la sección ya está abierta, se cierra y se elimina el filtro;
    // en caso contrario, se activa y se establece el filtro correspondiente
    setOpenSection(openSection === section ? '' : section);
    if (openSection === section) {
      setDomiciliarioIdFilter(null);
      return;
    }
    setDomiciliarioIdFilter(section);
  };

  // Si el sidebar no debe mostrarse, no se renderiza nada
  if (!openSidebarFilterDelivery) {
    return null;
  }

  return (
    <Col xs={3} md={2} className="vh-90 p-3 border-end d-none d-lg-block">
      <div className="position-relative">
        <h3 className="text-center border-bottom pb-2 mb-3">
          Filtrar por domiciliario
        </h3>
        <InfoButton textInfo="Selecciona un domiciliario para ver sus pedidos" />
      </div>

      <div className="overflow-auto" style={{ maxHeight: '70vh' }}>
        <ul className="list-unstyled">
          {listDomiciliarios.map((domiciliario) => (
            <SidebarElementDelivery
              key={domiciliario.id}
              handleToggle={handleToggle}
              openSection={openSection}
              title={domiciliario.name}
              eventKey={domiciliario.id}
              image={domiciliario?.photoUrl}
            />
          ))}

          <SidebarElementDelivery
            handleToggle={handleToggle}
            openSection={openSection}
            title="Ninguno"
            eventKey="ninguno"
            image={imageDefault}
          />

          {/* Botón para agregar nuevos domiciliarios */}
          <li className="mt-3">
            <div className="position-relative">
              <button
                className="btn btn-success w-100"
                onClick={() => openCloseModalAgregarDo()}
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
