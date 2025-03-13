import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { OrderService } from "../../../apis/clientV2/OrderService";
import { useAuth } from "../../../Context/AuthContext";
import { toast } from "react-toastify";
import { SelectKitchen } from "../../FormsInputs/SelectKitchen";

const ButtonChangeKitchen = ({ id, changeSucceed }) => {
	const { token } = useAuth();
	const orderService = new OrderService(token);
	const [isLoading, setIsLoading] = useState(false);
	const [isChanged, setIsChanged] = useState(false);
	const [kitchenIdSelect, setKitchenIdSelect] = useState(null);

	const changeKitchen = async () => {
		setIsLoading(true);
		try {
			console.log("id", id);
			await orderService.updateKitchen(id, kitchenIdSelect);
			setIsChanged(true);
			toast.success("Cocina cambiada");
			changeSucceed();
		} catch (error) {
			console.error("Error changing kitchen:", error);
			toast.error(`Error al cambiar la cocina: ${error?.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (

		<>
			<SelectKitchen kitchenIdSelect={kitchenIdSelect} setKitchenIdSelect={setKitchenIdSelect} />


			<Button
				variant="primary"
				onClick={() => {
					changeKitchen();
				}}
				disabled={isLoading || isChanged}
			>

				{isLoading ? <Spinner animation="border" size="sm" /> : isChanged ? "Cambiado" : "Cambiar Cocina"}
			</Button>
		</>
	);
}

export { ButtonChangeKitchen };