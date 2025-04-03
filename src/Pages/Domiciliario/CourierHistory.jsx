import { Alert, Button, Container, Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";
import { OrdersRowsContainer } from "../../components/Order/OrdersRowsContainer.jsx";
import { useOrderFindHistoryByCourier } from "../../hooks/api/order/useOrderFindHistoryByCourier.jsx";
import { useAuth } from "../../Context/AuthContext.jsx";
import { CourierLayout } from "../../Layout/CourierLayout.jsx";
import { Progress } from "antd";

const CourierHistory = () => {

	// Pedir las órdenes del día con fechas formateadas en UTCz
	const { error, data: ordenes, loading, fetchOrders } = useOrderFindHistoryByCourier();
	const { userData } = useAuth()

	const [pagoTotal, setPagoTotal] = useState(0);

	const fetchData = async () => {
		console.group('fetchData date');
		// const { start, end } = getRangoDiaInternacional(dayDate);
		const start = new Date();
		start.setHours(0, 0, 0, 0);
		const end = new Date();
		end.setHours(23, 59, 59, 999);
		const startDate = start.toGMTString();
		const endDate = end.toGMTString();
		console.log('startDate', startDate);
		console.log('endDate', endDate);
		console.groupEnd()


		await fetchOrders({ startDate, endDate, id: userData.id });
	};
	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (!ordenes) return;

		//caculamos el total de los domicilios
		let pagoTotalPre = 0;
		ordenes.forEach((order) => {
			pagoTotalPre += order.delivery.price || 0;
		});
		setPagoTotal(pagoTotalPre);
	}, [ordenes]);


	return (
		<CourierLayout>
			<Container fluid>
				<h1 className="text-center my-3">Historial</h1>
				<p>Esto son tus pedidos</p>

				{/* form filter order */}

				{/* Mostrar si hay un error */}
				{error && <Alert variant="danger">{error}</Alert>}

				{/* Mostrar si está cargando */}
				{loading && <div className="text-center"><Spinner animation="border" /></div>}

				{pagoTotal}
				<div className=''>
					<Progress size={250} type="dashboard" percent={80} format={() => (<><div className='m-2'>{pagoTotal}</div>
						<small >{4} </small><span style={{ fontSize: '0.8rem' }}> {4}km</span></>)} />
				</div>
				{/* Mostrar filas de las órdenes */}
				<OrdersRowsContainer listOrders={ordenes} />

				{/* boton para reintertar */}
				<Button variant="primary" onClick={fetchData}>Reintentar</Button>

			</Container>
		</CourierLayout >
	);
};

export { CourierHistory };
