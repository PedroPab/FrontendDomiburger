import { Dropdown, Image, Spinner } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { UsersService } from "../../apis/clientV2/usersService";
import { useEffect, useState } from "react";
import { useRecepcion } from "../../Context/RecepcionContex";
import { OrderService } from "../../apis/clientV2/OrderService";
import { toast } from "react-toastify";

const DeliveryDropdown = ({ assignedCourierUserId, orderId }) => {
  const { listDomiciliarios, openCloseModalAgregarDo } = useRecepcion();
  const { token } = useAuth();
  const userService = new UsersService(token);
  const [loadUser, setLoadUser] = useState(false);
  const [dataUserCourier, setDataUserCourier] = useState(null);
  const [loadChangeCourier, setLoadChangeCourier] = useState(false);

  const findUser = async () => {
    try {
      setLoadUser(true);
      const user = await userService.getByIdUser(assignedCourierUserId);
      setDataUserCourier(user.body);
    } catch (error) {
      toast.error(`Error al cargar el usuario: ${error?.response?.data?.message}`);
    } finally {
      setLoadUser(false);
    }
  };

  useEffect(() => {
    if (!assignedCourierUserId) {
      setDataUserCourier(null);
      return;
    }

    const localUser = listDomiciliarios.find(d => d.id === assignedCourierUserId);
    if (localUser) {
      setDataUserCourier(localUser);
    } else {
      findUser();
    }
  }, [token, assignedCourierUserId, listDomiciliarios]);

  const orderService = new OrderService(token);

  const updateCourierOrder = async (courierId) => {
    try {
      setLoadChangeCourier(true);
      await orderService.updateCourier(orderId, courierId);
    } catch (error) {
      toast.error(`Error al cambiar el domiciliario: ${error?.response?.data?.message}`);
    } finally {
      setLoadChangeCourier(false);
    }
  };

  return (
    <div className="d-flex align-items-center">
      {loadUser ? (
        <Spinner animation="border" size="sm" />
      ) : (
        assignedCourierUserId && (
          <Image
            src={dataUserCourier?.photoUrl}
            style={{
              width: "40px",
              height: "40px",
            }}
            roundedCircle
          />
        )
      )}

      <Dropdown className="m-2">
        <Dropdown.Toggle variant={assignedCourierUserId ? "success" : "danger"} id="dropdown-basic">
          {loadChangeCourier ? <Spinner animation="border" size="sm" /> : (dataUserCourier?.name || "Sin Domiciliario")}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* todos los domiciliarios disponibles */}
          {listDomiciliarios.map((domiciliario) => (
            <Dropdown.Item
              onClick={(e) => {
                const id = e.target.getAttribute("data-id");
                updateCourierOrder(id);
              }}
              key={domiciliario.id}
              data-id={domiciliario.id}
              disabled={domiciliario.id === assignedCourierUserId}
              className={domiciliario.id === assignedCourierUserId ? "bg-primary active" : ""}
            >
              {/* foto pequena del domiciliario  */}
              <Image
                src={domiciliario.photoUrl}
                style={{
                  width: "20px",
                  height: "20px",
                  marginRight: "10px",
                }}
                roundedCircle
              />
              {domiciliario.name}
            </Dropdown.Item>
          ))}

          <Dropdown.Divider />

          {/* opción para no asignar nada */}
          <Dropdown.Item
            onClick={() => updateCourierOrder(null)}
            style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
          >
            No asignar domiciliario
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => openCloseModalAgregarDo()}
            style={{ backgroundColor: "#bcbeff", color: "#3b28e0" }}
          >
            Seleccionar de la lista
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export { DeliveryDropdown };
