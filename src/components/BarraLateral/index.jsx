import { Nav } from 'react-bootstrap';

const BarraLateral = ({ modoOscuro }) => {
  // Clases condicionales para el modo oscuro
  const navbarClass = `flex-column navbar navbar-expand-lg ${modoOscuro ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`;

  return (
    <Nav
      className={navbarClass}
      style={{ height: '100vh', position: 'fixed', top: 50, left: 0, width: 50 }}
    >
      <Nav.Item>
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
          <button style={{
            border: 'none',
            background: 'none',
            padding: 0,
            cursor: 'pointer'
          }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="domiciliario"
              style={{ width: 40, height: 40, borderRadius: '50%' }}
            />
          </button>
        </div>
      </Nav.Item>
    </Nav>
  );
};

export { BarraLateral };
