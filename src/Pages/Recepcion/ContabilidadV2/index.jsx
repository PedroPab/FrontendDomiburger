import { Alert, Container, Spinner, Form, Row, Col, Button } from "react-bootstrap";
import LayoutRecepcion from "../../../Layout/Recepcion";
import { OrdersRowsContainer } from "../../../components/Order/OrdersRowsContainer";
import { useOrdersDay } from "./hooks/useOrdersDay";
import { useEffect, useState } from "react";

const ContabilidadV2 = () => {
	// Estados con fecha y hora local
	const [startDate, setStartDate] = useState(() => {
		let date = new Date();
		date.setHours(0 - 5, 0, 0, 0); // Inicio del día en hora local
		return date;
	});

	const [endDate, setEndDate] = useState(() => {
		let date = new Date();
		date.setHours(23 - 5, 59, 59, 999); // Fin del día en hora local
		return date;
	});

	// Función para convertir fecha local a UTC antes de enviarla
	const toUTCISOString = (date) => {
		const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Ajuste de zona horaria
		return utcDate.toISOString();
	};

	// Formatear fechas para enviarlas en UTC al servidor
	const startDateUTC = toUTCISOString(startDate);
	const endDateUTC = toUTCISOString(endDate);

	// Pedir las órdenes del día con fechas formateadas en UTCz
	const { error, data: ordenes, loading, fetchOrders } = useOrdersDay(startDateUTC, endDateUTC);

	// Función para manejar cambios en la fecha y hora manteniendo la hora local
	const handleDateTimeChange = (e, setDateFunction) => {
		let newDate = new Date(e.target.value);
		// Ajustar la fecha para mantener la hora local
		newDate.setMinutes(newDate.getMinutes() - newDate.getTimezoneOffset());
		setDateFunction(newDate);
	};
	const handleFetchOrders = () => {
		// Formatear fechas para enviarlas en UTC al servidor
		// Pedir las órdenes del día con fechas formateadas en UTC
		fetchOrders();


	}
	useEffect(() => {
		fetchOrders();
	}, []);

	const valueDate = (date) => {
		return date.toISOString().slice(0, 16);
	}

	return (
		<LayoutRecepcion>
			<Container fluid>
				<h1 className="text-center my-3">Contabilidad</h1>

				{/* Formulario para seleccionar la fecha y hora */}
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

				{/* Mostrar si hay un error */}
				{error && <Alert variant="danger">{error}</Alert>}

				{/* Mostrar si está cargando */}
				{loading && <div className="text-center"><Spinner animation="border" /></div>}

				{/* Mostrar filas de las órdenes */}
				<OrdersRowsContainer listOrders={ordenes} />
			</Container>
		</LayoutRecepcion>
	);
};

export { ContabilidadV2 };
