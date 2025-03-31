import { useMemo } from "react";
import { Card, ListGroup, Container, Row, Col, Accordion, Table, Image } from "react-bootstrap";
import { FaShoppingCart, FaMoneyBillWave, FaFileInvoiceDollar, FaCreditCard, FaBoxOpen, FaTruck } from "react-icons/fa";
import { useRecepcion } from "../../../Context/RecepcionContex";
import { calculateStatistics } from "./calculateStatistics";
import { ORDER_STATUSES } from "../../../Utils/const/status";

const SummaryStatisticsOrders = ({ listOrders }) => {
	const stats = useMemo(() => calculateStatistics(listOrders), [listOrders]);
	const totalInvoicedOrders = listOrders.filter(order => order.status === ORDER_STATUSES.INVOICED).length;
	const { listDomiciliarios, listProducts } = useRecepcion();

	return (
		<Container className="my-4">
			<h2 className="text-center mb-4">Resumen de Estadísticas de Órdenes</h2>
			<p className="text-muted text-center">Tener en cuenta que solo ven las estadisticas de los pedidos que están en el estado de facturados</p>
			<Row className="mb-4">
				<Col md={4} className="mb-3">
					<Card className="shadow text-center">
						<Card.Body>
							<FaFileInvoiceDollar size={40} className="mb-2" />
							<Card.Title>Órdenes Facturadas</Card.Title>
							<Card.Text className="card-text-large">
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
							<Card.Text className="card-text-large">
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
							<Card.Text className="card-text-large">
								{stats.totalProductsSold}
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Accordion defaultActiveKey="0">
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
											<th>Producto</th>
											<th>Cantidad</th>
											<th>Ventas Totales</th>
										</tr>
									</thead>
									<tbody>
										{Object.entries(stats.productsCount).map(([productId, data]) => {

											console.group("PRODUCTO");
											console.log("productId", productId);
											console.log("data", data);
											const product = listProducts.find(product => product.id === productId) || {};
											console.log("product", product);
											console.groupEnd();
											return (
												<tr key={productId}>
													<td>
														<div className="d-flex align-items-center">
															<Image
																src={product?.photoUrl}
																style={{
																	width: "40px",
																	height: "40px",
																}}
																roundedCircle
															/>
															<span className="ms-2">{product.name}</span>
														</div>
													</td>
													<td>{data.quantity}</td>
													<td>${data.totalSales.toLocaleString()}</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							</ListGroup.Item>
						</ListGroup>
					</Accordion.Body>
				</Accordion.Item>
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
										{Object.entries(stats.salesByDelivery).map(([deliveryId, data]) => {
											const dataUserCourier = listDomiciliarios.find(domiciliario => domiciliario.id === deliveryId) || {};
											return (
												<tr key={deliveryId}>
													<td>
														<div className="d-flex align-items-center">
															<Image
																src={dataUserCourier?.photoUrl}
																style={{
																	width: "40px",
																	height: "40px",
																}}
																roundedCircle
															/>
															<span className="ms-2">{dataUserCourier?.name || "Sin nombre?"}</span>
														</div>
													</td>
													<td>{data.quantity}</td>
													<td>${data.totalSales.toLocaleString()}</td>
												</tr>
											)
										})}
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
