import { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';

// Hook para detectar si el dispositivo es móvil
const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return isMobile;
};

const SelectAdicionClient = ({ producto, adiciones, onChangeSelect }) => {
	const [valor, setValor] = useState('');
	const isMobile = useIsMobile();



	return (
		<Col sm={7}>
			<Form.Group controlId="buscar">
				{/* <Form.Label>Seleccionar Adición</Form.Label> */}
				{isMobile ? (
					// En dispositivos móviles usamos un campo select
					<Form.Control as="select" value={valor} onChange={(e) => {
						const selectedValue = e.target.value;
						setValor(selectedValue);
						onChangeSelect(selectedValue, producto.idInter);
						// Opcional: resetear el valor del input para mostrar el placeholder nuevamente
						setValor('');
					}}>
						<option value="">Seleccionar Adición</option>
						{adiciones.map((e) => (
							<option key={e.id} value={e.id}>
								{e.name}
							</option>
						))}
					</Form.Control>
				) : (
					// En escritorio se utiliza el input con datalist
					<>
						<Form.Control
							type="text"
							list="opciones"
							placeholder="Seleccionar Adición"
							// value={valor}
							onChange={(e) => {
								const selectedValue = e.target.value;
								// setValor(selectedValue);
								onChangeSelect(selectedValue, producto.idInter);
								// Opcional: resetear el valor del input para mostrar el placeholder nuevamente
								e.target.value = ''
							}}
						/>
						<datalist id="opciones">
							{adiciones.map((e) => (
								<option key={e.id} value={e.id}>
									{e.name}
								</option>
							))}
						</datalist>
					</>
				)}
			</Form.Group>
		</Col>
	);
};

export { SelectAdicionClient };
