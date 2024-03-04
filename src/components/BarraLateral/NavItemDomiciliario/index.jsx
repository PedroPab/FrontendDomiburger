import { Nav } from "react-bootstrap";

const NavItemDomiciliario = ({ domiciliario, isActive, active }) => {
  const buttonClass = (isActive) => isActive ? 'btn btn-success' : 'btn btn-secondary';

  return (
    <>
      <Nav.Item className="mb-2 ">
        <button
          className={buttonClass(isActive(domiciliario.id)) + ' rounded-pill me-3 '}
          style={{ border: 'none', padding: 0, width: '100%', textAlign: 'left', }}
          onClick={() => {
            active(domiciliario.id)
          }
          }
        >
          <img
            src={domiciliario.imageUrl}
            alt={domiciliario.name}
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: '10px' }}
          />
          {domiciliario.name}
        </button>
      </Nav.Item>
    </>
  )
}

export { NavItemDomiciliario }