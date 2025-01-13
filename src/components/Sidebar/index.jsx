import { Col } from 'react-bootstrap';
import { useState } from 'react';
import SidebarElement from './SidebarElement';

const Sidebar = () => {
  const [openSection, setOpenSection] = useState('dashboard');

  const handleToggle = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <Col xs={3} md={2} className="vh-90 p-3 border-end">
      <ul className="list-unstyled">
        <SidebarElement
          handleToggle={handleToggle}
          openSection={openSection}
          title="Home"
          eventKey="home"
          imageUrl='https://i.pravatar.cc/150?img=3'
        />
        <SidebarElement
          handleToggle={handleToggle}
          openSection={openSection}
          title="Dashboard"
          eventKey="dashboard"
          imageUrl="https://i.pravatar.cc/150?img=3"
        />
        <SidebarElement
          handleToggle={handleToggle}
          openSection={openSection}
          title="Orders"
          eventKey="orders"
          imageUrl="https://i.pravatar.cc/150?img=3"
        />
        <li className="border-top my-3"></li>
        <SidebarElement
          handleToggle={handleToggle}
          openSection={openSection}
          title="Account"
          eventKey="account"
          imageUrl="https://i.pravatar.cc/150?img=3"
        />
      </ul>
    </Col>
  );
};

export default Sidebar;
