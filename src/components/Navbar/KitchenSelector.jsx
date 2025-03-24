import { useState, useCallback } from 'react';
import { Button, Col, NavDropdown, Spinner } from 'react-bootstrap';
import { MdOutlineSettings } from 'react-icons/md';
import { useWorker } from '../../Context/WorkerContext';
import { useMiContexto } from '../../Context';
import { useAuth } from '../../Context/AuthContext';

const KitchenSelector = () => {
	const { listKitchens } = useWorker();
	const { changeKitchen, kitchenSelectId } = useMiContexto();
	const { userData } = useAuth();

	const [showKitchens, setShowKitchens] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Función para alternar la visualización de las cocinas con un retraso simulado
	const handleToggleKitchens = useCallback(() => {
		setShowKitchens(prev => !prev);
		if (!isLoading) {
			setIsLoading(true);
			setTimeout(() => setIsLoading(false), 1000);
		}
	}, [isLoading]);

	// Función auxiliar para obtener el nombre de la cocina o un valor por defecto
	const getKitchenName = (kitchenId) => {
		const kitchen = listKitchens?.find(k => k.id === kitchenId);
		return kitchen ? kitchen.name : 'Sin cocina Seleccionada';
	};

	return (
		<Col xs="auto">
			<Button
				variant="link"
				onClick={handleToggleKitchens}
				className="p-2 text-primary d-flex align-items-center"
				style={{ boxShadow: 'none', border: 'none' }}
			>
				<MdOutlineSettings size={20} className="me-1" /> Seleccionar Cocina
			</Button>

			{/* Muestra la cocina actualmente seleccionada */}
			<span className="mx-2">
				{getKitchenName(kitchenSelectId)}
			</span>

			{/* Indicador de carga o menú de selección de cocinas */}
			{isLoading ? (
				<Spinner animation="border" size="sm" />
			) : (
				showKitchens && (
					<NavDropdown show className="w-100">
						{userData?.assignedKitchens?.length ? (
							userData.assignedKitchens.map((kitchenId) => (
								<NavDropdown.Item
									key={kitchenId}
									onClick={() => changeKitchen(kitchenId)}
								>
									{getKitchenName(kitchenId)}
								</NavDropdown.Item>
							))
						) : (
							<NavDropdown.Item disabled>
								No tienes cocinas asignadas
							</NavDropdown.Item>
						)}
					</NavDropdown>
				)
			)}
		</Col>
	);
};

export { KitchenSelector };
