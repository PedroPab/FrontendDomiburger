import { Button, Collapse } from "react-bootstrap";

const SidebarElementDelivery = ({ handleToggle, openSection, title, eventKey, image }) => {
  const isSelected = openSection === eventKey;

  return (
    <li className="mb-3">
      <Button
        onClick={() => handleToggle(eventKey)}
        aria-controls={`${eventKey}-collapse`}
        aria-expanded={isSelected}
        className={`d-flex align-items-center w-100 px-3 py-2 ${isSelected ? "bg-danger" : ""}`}
        style={{
          border: "none",
          borderRadius: "0.5rem",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        <div
          className="rounded-circle overflow-hidden d-flex justify-content-center align-items-center"
          style={{
            width: "50px",
            height: "50px",
            border: `2px solid ${isSelected ? "" : "#007bff"}`,
            marginRight: "10px",
            flexShrink: 0,
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <span
          style={{
            fontWeight: "bold",
            flex: 1,
            textAlign: "left",
            fontSize: "1.1rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </span>
      </Button>
      <Collapse in={isSelected}>
        <div id={`${eventKey}-collapse`} className="mt-2 ps-3">
          <ul className="list-unstyled">
            {/* Aquí puedes agregar el contenido de la sección colapsable */}
            {/* <li>Costo de pedido</li>
            <li>Estado: entregando</li>
            <li>2 pedidos asignados</li> */}
          </ul>
        </div>
      </Collapse>
    </li>
  );
};

export default SidebarElementDelivery;
