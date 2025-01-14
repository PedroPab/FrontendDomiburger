import { Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import SidebarElementDelivery from './SidebarElement';
import { RecepcionContexto } from '../../Context/RecepcionContex';
import InfoButton from '../InfoButton';

const Sidebar = () => {
  const contextRecepcion = useContext(RecepcionContexto)

  const [openSection, setOpenSection] = useState('dashboard');

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? '' : section);
    // establecer el domiciliarioIdFilter segun el id del domiciliario
    //si es el mismo que el que esta selecion lo quitamos y ponemos ''
    if (openSection === section) {
      contextRecepcion.setDomiciliarioIdFilter(null)
      return
    }
    contextRecepcion.setDomiciliarioIdFilter(section)
  };

  return (
    <Col xs={3} md={2} className="vh-90 p-3 border-end">

      <div className="position-relative">
        <h3 className="text-center border-bottom pb-2 mb-3">
          Filtrar por domiciliario
        </h3>
        <InfoButton textInfo={'Selecciona un domiciliario para ver sus pedidos'} />
      </div>

      <ul className="list-unstyled">

        {
          contextRecepcion.listDomiciliarios.map(domiciliario => (
            <SidebarElementDelivery
              key={domiciliario.id}
              handleToggle={handleToggle}
              openSection={openSection}
              title={domiciliario.name}
              eventKey={domiciliario.id}
              imageUrl={`https://i.pravatar.cc/150?img=${domiciliario.id}`}
            />
          ))
        }

        <SidebarElementDelivery
          handleToggle={handleToggle}
          openSection={openSection}
          title={'Ninguno'}
          eventKey={'ninguno'}
          imageUrl={`https://i.pravatar.cc/150?img=${10}`}
        />

        {/* agrega un botón para poner mas domiciliarios */}
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
    </Col>
  );
};

export default Sidebar;
