import { useState, useCallback } from 'react';
import { Col, Dropdown, Spinner } from 'react-bootstrap';
import { LuChefHat } from 'react-icons/lu';
import { useWorker } from '../../Context/WorkerContext';
import { useMiContexto } from '../../Context';
import { useAuth } from '../../Context/AuthContext';

const KitchenSelector = () => {
	const { listKitchens } = useWorker();
	const { changeKitchen, kitchenSelectId } = useMiContexto();
	const { userData } = useAuth();

	const [isLoading, setIsLoading] = useState(false);

	// Función auxiliar para obtener el nombre de la cocina o un valor por defecto
	const getKitchenName = (kitchenId) => {
		const kitchen = listKitchens?.find((k) => k.id === kitchenId);
		return kitchen ? kitchen.name : 'Sin cocina seleccionada';
	};

	// Simula una carga y activa el spinner en el ícono de chef
	const handleToggleLoading = useCallback(() => {
		if (!isLoading) {
			setIsLoading(true);
			setTimeout(() => setIsLoading(false), 1000);
		}
	}, [isLoading]);

	// Al seleccionar una cocina, se activa el spinner y se actualiza la cocina seleccionada
	const handleSelectKitchen = (kitchenId) => {
		handleToggleLoading();
		changeKitchen(kitchenId);
	};

	return (
		<Col xs="auto">
			<Dropdown color='muted'>
				<Dropdown.Toggle
					variant="secondary"
					color='muted'
					id="dropdown-kitchen"
					className="d-flex align-items-center"
					size="sm"
				>
					{isLoading ? (
						<Spinner animation="border" size="sm" />
					) : (
						<LuChefHat size={20} className="me-1" />
					)}
					<span className="mx-2">{getKitchenName(kitchenSelectId)}</span>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					{userData?.assignedKitchens?.length ? (
						userData.assignedKitchens.map((kitchenId) => (
							<Dropdown.Item
								key={kitchenId}
								onClick={() => handleSelectKitchen(kitchenId)}
							>
								{getKitchenName(kitchenId)}
							</Dropdown.Item>
						))
					) : (
						<Dropdown.Item disabled>
							No tienes cocinas asignadas
						</Dropdown.Item>
					)}
				</Dropdown.Menu>
			</Dropdown>
		</Col>
	);
};

export { KitchenSelector };
