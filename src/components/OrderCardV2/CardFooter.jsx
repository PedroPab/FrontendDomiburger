import { Card, Button, Dropdown, Image } from "react-bootstrap";

function CardFooterComponent({ urlPhotoDelivery, nameDelivery, nextStatus }) {
  return (
    <Card.Footer className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">

        <Image
          src={urlPhotoDelivery || "https://i.pravatar.cc/300"}
          style={{
            width: "40px",
            height: "40px",
          }}
          roundedCircle
        />

        <Dropdown className="m-2">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {nameDelivery || "Sin Domiciliario"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </div>
      <Button variant="primary" onClick={nextStatus}>{"Siguiente"}</Button>
    </Card.Footer>
  );
}

export default CardFooterComponent;
