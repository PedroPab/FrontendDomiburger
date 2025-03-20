import React, { useMemo } from "react";
import { Card, ListGroup, Container, Row, Col, Accordion, Table } from "react-bootstrap";
import { ORDER_STATUSES } from "../../../Utils/const/status";
import {
	FaShoppingCart,
	FaMoneyBillWave,
	FaFileInvoiceDollar,
	FaCreditCard,
	FaBoxOpen,
	FaTruck
} from "react-icons/fa";

const SummaryStatisticsOrders = ({ listOrders }) => {
	// Función que calcula las estadísticas a partir de las órdenes.
	const calculateStatistics = (orders) => {
		let totalSales = 0;
		let salesByPaymentMethod = {}; // Ej: { cash: [], bancolombia: [] }
		let totalProductsSold = 0;
		let productsCount = {}; // Ej: { "1": { quantity: 0, totalSales: 0 }, "2": { ... } }
		let deliveryCount = 0;
		let totalDeliverySales = 0;
		let totalDeliveryCost = 0;
		let totalSalesNotCounted = 0; // Órdenes no facturadas
		let salesByDelivery = {}; // Ej: { "id": { quantity: 0, totalSales: 0 }, "2": { ... } }

		orders.forEach((order) => {
			// Solo se contarán las órdenes que estén en el estado de facturado.
			if (order.status !== ORDER_STATUSES.INVOICED) {
				totalSalesNotCounted++;
				return;
			}

			// Ventas
			totalSales += order.totalPrice || 0;

			// Consideramos pago confirmado si existe y es "approved", o si no existe se asume confirmado.
			const isPaymentConfirmed = order.payment ? order.payment.status === "approved" : true;
			if (isPaymentConfirmed) {
				const paymentMethod = order.paymentMethod || "desconocido";
				if (!salesByPaymentMethod[paymentMethod]) {
					salesByPaymentMethod[paymentMethod] = [];
				}
				salesByPaymentMethod[paymentMethod].push(order);
			}

			// Productos
			order.orderItems.forEach((item) => {
				const quantity = item.quantity || 1;
				totalProductsSold += quantity;

				if (!productsCount[item.id]) {
					productsCount[item.id] = { quantity: 0, totalSales: 0 };
				}
				productsCount[item.id].quantity += quantity;
				productsCount[item.id].totalSales += item.price * quantity;

				// Procesar adiciones o complementos si existen
				if (item?.complements) {
					item.complements.forEach((complement) => {
						const compQuantity = complement.quantity || 1;
						totalProductsSold += compQuantity;
						if (!productsCount[complement.id]) {
							productsCount[complement.id] = { quantity: 0, totalSales: 0 };
						}
						productsCount[complement.id].quantity += compQuantity;
						productsCount[complement.id].totalSales += complement.price * compQuantity;
					});
				}
			});

			// Domicilios
			if (order.delivery) {
				deliveryCount++;
				totalDeliverySales += order.totalPrice || 0;
				totalDeliveryCost += order.delivery.price || 0;
			}

			// Ventas por domicilio
			if (order.assignedCourierUserId) {
				const deliveryId = order.assignedCourierUserId
				if (!salesByDelivery[deliveryId]) {
					salesByDelivery[deliveryId] = { quantity: 0, totalSales: 0 };
				}
				salesByDelivery[deliveryId].quantity++;
				salesByDelivery[deliveryId].totalSales
					+= order.totalPrice || 0;
			}


		});

		return {
			totalSales,
			salesByPaymentMethod,
			totalProductsSold,
			productsCount,
			deliveryCount,
			totalDeliverySales,
			salesByDelivery,
			totalDeliveryCost,
			totalSalesNotCounted
		};
	};

	// Memorizar el cálculo para evitar recálculos innecesarios
	const stats = useMemo(() => calculateStatistics(listOrders), [listOrders]);
	const totalInvoicedOrders = listOrders.filter(order => order.status === ORDER_STATUSES.INVOICED).length;

	return (
		<Container className="my-4">
			<h2 className="text-center mb-4">Resumen de Estadísticas de Órdenes</h2>

			{/* Sección de resumen con tarjetas informativas */}
			<Row className="mb-4">
				<Col md={4} className="mb-3">
					<Card className="shadow text-center">
						<Card.Body>
							<FaFileInvoiceDollar size={40} className="mb-2" />
							<Card.Title>Órdenes Facturadas</Card.Title>
							<Card.Text style={{ fontSize: '1.5rem' }}>
								{totalInvoicedOrders}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4} className="mb-3">
					<Card className="shadow text-center">
						<Card.Body>
							<FaMoneyBillWave size={40} className="mb-2" />
							<Card.Title>Ventas Totales</Card.Title>
							<Card.Text style={{ fontSize: '1.5rem' }}>
								${stats.totalSales.toLocaleString()}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4} className="mb-3">
					<Card className="shadow text-center">
						<Card.Body>
							<FaShoppingCart size={40} className="mb-2" />
							<Card.Title>Productos Vendidos</Card.Title>
							<Card.Text style={{ fontSize: '1.5rem' }}>
								{stats.totalProductsSold}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Accordion para seccionar la información detallada */}
			<Accordion defaultActiveKey="0">
				{/* Sección de Ventas */}
				<Accordion.Item eventKey="0">
					<Accordion.Header>
						<FaCreditCard className="me-2" /> Ventas
					</Accordion.Header>
					<Accordion.Body>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<strong>Cantidad de ventas registradas:</strong> {listOrders.length}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Total de ventas:</strong> ${stats.totalSales.toLocaleString()}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Órdenes no facturadas:</strong> {stats.totalSalesNotCounted}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Ventas confirmadas por método de pago:</strong>
								<Table striped bordered hover size="sm" className="mt-2">
									<thead>
										<tr>
											<th>Método de Pago</th>
											<th>Cantidad</th>
											<th>Total</th>
										</tr>
									</thead>
									<tbody>
										{Object.entries(stats.salesByPaymentMethod).map(([method, orders]) => (
											<tr key={method}>
												<td>{method}</td>
												<td>{orders.length}</td>
												<td>${orders.reduce((acc, order) => acc + order.totalPrice, 0).toLocaleString()}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</ListGroup.Item>
						</ListGroup>
					</Accordion.Body>
				</Accordion.Item>

				{/* Sección de Productos */}
				<Accordion.Item eventKey="1">
					<Accordion.Header>
						<FaBoxOpen className="me-2" /> Productos
					</Accordion.Header>
					<Accordion.Body>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<strong>Total de productos vendidos:</strong> {stats.totalProductsSold}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Detalle por producto:</strong>
								<Table striped bordered hover size="sm" className="mt-2">
									<thead>
										<tr>
											<th>ID Producto</th>
											<th>Cantidad</th>
											<th>Ventas Totales</th>
										</tr>
									</thead>
									<tbody>
										{Object.entries(stats.productsCount).map(([productId, data]) => (
											<tr key={productId}>
												<td>{productId}</td>
												<td>{data.quantity}</td>
												<td>${data.totalSales.toLocaleString()}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</ListGroup.Item>
						</ListGroup>
					</Accordion.Body>
				</Accordion.Item>

				{/* Sección de Domicilios */}
				<Accordion.Item eventKey="2">
					<Accordion.Header>
						<FaTruck className="me-2" /> Domicilios
					</Accordion.Header>
					<Accordion.Body>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<strong>Cantidad de domicilios:</strong> {stats.deliveryCount}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Total de ventas por domicilio:</strong> ${stats.totalDeliverySales.toLocaleString()}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Total de costos de domicilios:</strong> ${stats.totalDeliveryCost.toLocaleString()}
							</ListGroup.Item>
							<ListGroup.Item>
								<strong>Detalle de ventas por domicilio:</strong>
								<Table striped bordered hover size="sm" className="mt-2">
									<thead>
										<tr>
											<th>ID Domicilio</th>
											<th>Cantidad</th>
											<th>Ventas Totales</th>
										</tr>
									</thead>
									<tbody>
										{Object.entries(stats.salesByDelivery).map(([deliveryId, data]) => (
											<tr key={deliveryId}>
												<td>{deliveryId}</td>
												<td>{data.quantity}</td>
												<td>${data.totalSales.toLocaleString()}</td>
											</tr>
										))}
									</tbody>
								</Table>
							</ListGroup.Item>
						</ListGroup>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		</Container>
	);
};

export { SummaryStatisticsOrders };
