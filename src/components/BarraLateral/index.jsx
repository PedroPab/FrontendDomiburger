import { Nav } from 'react-bootstrap';
import { MdHome, MdContactMail } from 'react-icons/md'; // Ejemplo usando Material Icons

const BarraLateral = () => {
  return (
    <Nav className="flex-column navbar navbar-expand-lg navbar-light bg-light" style={{ height: '100vh', position: 'fixed', top: 50, left: 0, width: 50 }}>
      <Nav href="#inicio" className="text-dark"><MdHome /></Nav>
      <Nav href="#servicios" className="text-dark"><MdHome /></Nav>
      <Nav href="#contacto" className="text-dark"><MdContactMail /></Nav>
      {/* Agrega más enlaces con iconos según necesites */}
    </Nav>
  );
};

export { BarraLateral };
