import { Button, Collapse } from "react-bootstrap";

const SidebarElementDelivery = ({ handleToggle, openSection, title, eventKey, imageUrl }) => {
  return (
    <li className="mb-3">
      <Button
        onClick={() => handleToggle(eventKey)}
        aria-controls={`${eventKey}-collapse`}
        aria-expanded={openSection === eventKey}
        className="d-flex align-items-center"
        style={{
          border: 'none',
          background: 'none',
          padding: 0
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: '2px solid #007bff',
            marginRight: '10px'
          }}
        />
        <span>{title}</span>
      </Button>
      <Collapse in={openSection === eventKey}>
        <div id={`${eventKey}-collapse`}>
          <ul className="list-unstyled">
            {/* <li>Costo de pedido</li>
            <li>estado: entregando</li>
            <li>2 pedidos asignados</li> */}
          </ul>
        </div>
      </Collapse>
    </li>
  );
}

export default SidebarElementDelivery;