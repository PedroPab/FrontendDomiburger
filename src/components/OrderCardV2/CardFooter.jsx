import { Card, Button, Dropdown, Image, Spinner } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { OrderService } from "../../apis/clientV2/OrderService";
import { toast } from "react-toastify";
import { useState } from "react";
import { statusNext } from "../../Utils/const/statusChange/listNextStatus";
import { statusOrderCol } from "../../Utils/listStatus";

function CardFooterComponent({ urlPhotoDelivery, nameDelivery, data }) {
  console.log("🚀 ~ CardFooterComponent ~ data:", data)
  const { token } = useAuth();
  const orderService = new OrderService(token);

  const [loadChangeStatus, setLoadChangeStatus] = useState(false);
  const nextStatus = () => {
    const updateOrderStatus = async () => {
      const id = data.id;
      const previousState = data.status;
      const nextState = statusNext(previousState);
      try {
        await orderService.changeStatus(id, previousState, nextState);

        setLoadChangeStatus(false);
        toast.success("Estado de la orden actualizado");
      } catch (error) {
        setLoadChangeStatus(false);
        toast.error(`Error al cambiar el estado de la orden ${error.response.data.message}`);
      }
    };
    setLoadChangeStatus(true);
    updateOrderStatus();
  };

  const nameStatus = statusOrderCol[data.status]?.label

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
      <Button variant="primary" onClick={nextStatus} disabled={loadChangeStatus}>
        {loadChangeStatus ? <Spinner animation="border" size="sm" /> : nameStatus || "Cambiar estado"}
      </Button>
    </Card.Footer>
  );
}

export { CardFooterComponent };
