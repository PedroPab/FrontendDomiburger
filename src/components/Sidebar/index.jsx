import { Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import SidebarElementDelivery from './SidebarElement';
import { RecepcionContexto } from '../../Context/RecepcionContex';

const Sidebar = () => {
  const contextRecepcion = useContext(RecepcionContexto)

  const [openSection, setOpenSection] = useState('dashboard');

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <Col xs={3} md={2} className="vh-90 p-3 border-end">
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

      </ul>
    </Col>
  );
};

export default Sidebar;
