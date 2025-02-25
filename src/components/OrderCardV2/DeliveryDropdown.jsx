import { Dropdown, Image } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { UsersService } from "../../apis/clientV2/usersService";
import { useEffect, useState } from "react";

const DeliveryDropdown = ({ assignedCourierUserId }) => {
	//consultamos lo datos del domiciliario

	const { token } = useAuth();
	const userService = new UsersService(token);
	const [loadUser, setLoadUser] = useState(false);
	const [dataUserCourier, setDataUserCourier] = useState(null);

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

	}

	useEffect(() => {
		setLoadUser(true);
		findUser();
	}, [token, assignedCourierUserId]);


	return (

		<div className="d-flex align-items-center">
			<Image
				src={dataUserCourier?.photoUrl || "https://i.pravatar.cc/300"}
				style={{
					width: "40px",
					height: "40px",
				}}
				roundedCircle
			/>


			<Dropdown className="m-2">
				<Dropdown.Toggle variant="success" id="dropdown-basic">
					{dataUserCourier?.name || "Sin Domiciliario"}
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
					{/* todos lo domiciliarios disponibles */}
				</Dropdown.Menu>
			</Dropdown>
		</div>

	);
}

export { DeliveryDropdown };