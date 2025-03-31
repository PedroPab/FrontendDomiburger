import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const FormFilterOrder = ({ fetchOrders, loading }) => {
	const [startDate, setStartDate] = useState(() => {
		let date = new Date();
		date.setHours(0, 0, 0, 0); // Inicio del día en hora local
		return date;
	});

	const [endDate, setEndDate] = useState(() => {
		let date = new Date();
		date.setHours(23, 59, 59, 999); // Fin del día en hora local
		return date;
	});

	// Manejar cambios en el input de fecha y hora, interpretándolos como locales
	const handleDateTimeChange = (e, setDateFunction) => {
		const newDate = new Date(e.target.value);
		setDateFunction(newDate);
	};

	// Función para formatear la fecha y hora de forma local para el input
	const formatLocalDateTime = (date) => {
		const tzOffset = date.getTimezoneOffset() * 60000; // offset en milisegundos
		return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
	};

	// Al enviar, se convierte la fecha a formato ISO (UTC) para enviarla al servidor
	const handleFetchOrders = () => {
		fetchOrders(startDate.toISOString(), endDate.toISOString());
	};

	useEffect(() => {
		fetchOrders(startDate.toISOString(), endDate.toISOString());
	}, []);

	return (
		<Form className="mb-3">
			<Row className="justify-content-center">
				<Col xs={12} md={6} lg={4}>
					<Form.Group>
						<Form.Label>Seleccionar Fecha y Hora de Inicio:</Form.Label>
						<Form.Control
							type="datetime-local"
							value={formatLocalDateTime(startDate)}
							onChange={(e) => handleDateTimeChange(e, setStartDate)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className="justify-content-center mt-2">
				<Col xs={12} md={6} lg={4}>
					<Form.Group>
						<Form.Label>Seleccionar Fecha y Hora de Fin:</Form.Label>
						<Form.Control
							type="datetime-local"
							value={formatLocalDateTime(endDate)}
							onChange={(e) => handleDateTimeChange(e, setEndDate)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className="justify-content-center mt-3">
				<Col xs="auto">
					<Button variant="primary" onClick={handleFetchOrders} disabled={loading}>
						{loading ? "Buscando..." : "Buscar Órdenes"}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export { FormFilterOrder };
