import { Button, Collapse } from "react-bootstrap";

const SidebarElementDelivery = ({ handleToggle, openSection, title, eventKey, imageUrl }) => {
  const isSelected = openSection === eventKey;

  return (
    <li className="mb-3">
      <Button
        onClick={() => handleToggle(eventKey)}
        aria-controls={`${eventKey}-collapse`}
        aria-expanded={isSelected}
        className="d-flex align-items-center"
        style={{
          border: 'none',
          background: 'none',
          padding: 0,
          color: isSelected ? 'red' : 'inherit'
        }}
      >
        <img
          src={imageUrl}
          alt={title}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: isSelected ? '2px solid red' : '2px solid #007bff',
            marginRight: '10px'
          }}
        />
        <span>{title}</span>
      </Button>
      <Collapse in={isSelected}>
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