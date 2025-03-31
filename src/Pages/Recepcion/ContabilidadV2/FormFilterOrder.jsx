import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"

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

	// Función para convertir fecha local a UTC antes de enviarla
	const toUTCISOString = (date) => {
		const datep = new Date(date);
		return datep.toGMTString();
	};

	// Formatear fechas para enviarlas en UTC al servidor
	const startDateUTC = toUTCISOString(startDate);
	const endDateUTC = toUTCISOString(endDate);

	// Función para manejar cambios en la fecha y hora manteniendo la hora local
	const handleDateTimeChange = (e, setDateFunction) => {
		let newDate = new Date(e.target.value);
		// Ajustar la fecha para mantener la hora local
		setDateFunction(newDate);
	};

	const handleFetchOrders = () => {
		// Formatear fechas para enviarlas en UTC al servidor
		// Pedir las órdenes del día con fechas formateadas en UTC
		fetchOrders(startDateUTC, endDateUTC);
	}

	useEffect(() => {

		fetchOrders(startDateUTC, endDateUTC);
	}, []);

	const valueDate = (date) => {
		return date.toISOString().slice(0, 16);
	}

	return (
		<Form className="mb-3">
			<Row className="justify-content-center">
				<Col xs={12} md={6} lg={4}>
					<Form.Group>
						<Form.Label>Seleccionar Fecha y Hora de Inicio:</Form.Label>
						<Form.Control
							type='datetime-local'
							value={valueDate(startDate)} // Formato YYYY-MM-DDTHH:MM
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
							value={valueDate(endDate)} // Formato YYYY-MM-DDTHH:MM
							onChange={(e) => handleDateTimeChange(e, setEndDate)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row className="justify-content-center mt-3">
				<Col xs="auto">
					<Button variant="primary	" onClick={handleFetchOrders} disabled={loading}>
						{loading ? "Buscando..." : "Buscar Órdenes"}
					</Button>
				</Col>
			</Row>
		</Form>
	)
}

export { FormFilterOrder }