import { Dropdown, Image, Spinner } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { UsersService } from "../../apis/clientV2/usersService";
import { useEffect, useState } from "react";
import { useRecepcion } from "../../Context/RecepcionContex";
import { OrderService } from "../../apis/clientV2/OrderService";
import { toast } from "react-toastify";

const DeliveryDropdown = ({ assignedCourierUserId, orderId }) => {
	const { listDomiciliarios } = useRecepcion();

	const { token } = useAuth();
	const userService = new UsersService(token);
	const [loadUser, setLoadUser] = useState(false);
	const [dataUserCourier, setDataUserCourier] = useState(null);
	const [loadChangeCourier, setLoadChangeCourier] = useState(false);

	const findUser = async () => {
		try {
			const user = await userService.getByIdUser(assignedCourierUserId);
			console.log("🚀🚀🚀🚀 haciendo una petición :", user);
			setDataUserCourier(user.body);
			setLoadUser(false);
		} catch (error) {
			setLoadUser(false);
			console.error("🚀🚀🚀🚀 error al hacer la petición :", error);
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
			setLoadUser(true);
			findUser();
		}
	}, [token, assignedCourierUserId, listDomiciliarios]);

	const orderService = new OrderService(token);

	const updateCourierOrder = async (courierId) => {
		try {
			setLoadChangeCourier(true);
			await orderService.updateCurrier(orderId, courierId);
			setLoadChangeCourier(false);
		} catch (error) {
			setLoadChangeCourier(false);
			toast.error(`Error al cambiar el domiciliario: ${error?.response?.data?.message}`);
		}
	};


	return (
		<div className="d-flex align-items-center">
			{
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
			}

			<Dropdown className="m-2">
				<Dropdown.Toggle variant={assignedCourierUserId ? "success" : "danger"} id="dropdown-basic">
					{loadChangeCourier ? <Spinner animation="border" size="sm" /> : (dataUserCourier?.name || "Sin Domiciliario")}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{/* opción para no asignar nada */}
					<Dropdown.Item
						onClick={() => updateCourierOrder(null)}
						style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
					>
						No asignar domiciliario
					</Dropdown.Item>
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
							style={domiciliario.id === assignedCourierUserId ? { backgroundColor: "#d3d3d3" } : {}}
						>
							{domiciliario.name}

						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

export { DeliveryDropdown };
