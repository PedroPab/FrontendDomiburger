import { useState } from 'react';
import { Button, Col, NavDropdown, Spinner } from 'react-bootstrap';
import { MdOutlineSettings } from 'react-icons/md';
import { useWorker } from '../../Context/WorkerContext';
import { useMiContexto } from '../../Context';
import { useAuth } from '../../Context/AuthContext';

const KitchenSelector = () => {
	const { listKitchens } = useWorker()
	const { changeKitchen, kitchenSelectId } = useMiContexto();
	const { userData } = useAuth();


	const [showKitchens, setShowKitchens] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Lógica para manejar el click en el botón y mostrar las cocinas
	const handleToggleKitchens = () => {
		setShowKitchens(!showKitchens);
		if (!isLoading) {
			setIsLoading(true);
			// Simula el retraso de carga de las cocinas
			setTimeout(() => setIsLoading(false), 1000);
		}
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

			{/* Cocina seleccionada */}
			<span className="mx-2">
				{listKitchens && listKitchens.find((k) => k.id === kitchenSelectId)?.name || 'Cocina'}
			</span>

			{/* Mostrar el indicador de carga mientras se están cargando las cocinas */}
			{isLoading ? (
				<Spinner animation="border" size="sm" />
			) : (
				showKitchens && (
					<NavDropdown show className="w-100">
						{userData?.assignedKitchens.length ? (
							userData.assignedKitchens.map((kitchen) => (
								<NavDropdown.Item
									key={kitchen}
									onClick={() => changeKitchen(kitchen)}
								>
									{listKitchens.find((k) => k.id === kitchen)?.name || 'Cocina'}
								</NavDropdown.Item>
							))
						) : (
							<NavDropdown.Item disabled>No tienes cocinas asignadas</NavDropdown.Item>
						)}
					</NavDropdown>
				)
			)}
		</Col>
	);
};

export { KitchenSelector };
