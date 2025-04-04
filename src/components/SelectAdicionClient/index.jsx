import { useState } from 'react';
import { Col, Form } from 'react-bootstrap';

const SelectAdicionClient = ({ producto, adiciones, onChangeSelect }) => {
	const [valor, setValor] = useState(''); // estado para manejar el valor del input

	const handleChange = (e) => {
		const selectedValue = e.target.value;
		setValor(selectedValue);
		onChangeSelect(selectedValue, producto.idInter);
		// Opcional: resetear el valor del input a un placeholder
		setValor('');
	};

	return (
		<Col sm={7}>
			<Form.Group controlId="buscar">
				<Form.Label>Seleccionar Adición</Form.Label>
				<Form.Control
					type="text"
					list="opciones"
					placeholder="Seleccionar Adición"
					value={valor}
					onChange={handleChange}
				/>
				<datalist id="opciones">
					{adiciones.map((e) => (
						<option key={e.id} value={e.id}>
							{e.name}
						</option>
					))}
				</datalist>
			</Form.Group>
		</Col>
	);
};

export { SelectAdicionClient };
