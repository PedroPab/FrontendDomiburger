import { Accordion, Row, Col, ListGroup, Badge } from "react-bootstrap";
import formatearNumeroConPuntos from "../../Utils/formatearNumeroConPuntos";
import { toast } from "react-toastify";
import { OrderService } from "../../apis/clientV2/OrderService";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react"; // se importa useState
import { PAYMENT_METHODS } from "../../Utils/const/paymentMethods";
import { usePreferences } from "../../Context/PreferencesContext";
import { checkUserRolesValidity } from "../../Utils/checkUserRolesValidity";
import { ROLES } from "../../Utils/const/roles";
import { ConfirmActionButton } from "../common/ConfirmActionButton";
import SubTitleNamePayment from "./SubTitleNamePayment";


const PaymentInfoOrder = ({ data }) => {
	const { totalPrice, delivery, paymentMethod, payment } = data;


	const { token } = useAuth();
	const orderService = new OrderService(token);
	const { roleSelect } = usePreferences()
	// Estado para gestionar la carga de la petición
	const [loading, setLoading] = useState(false);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

	// Función para aprobar el pago
	const updatePayment = async (id) => {
		setLoading(true);
		try {
			const response = await orderService.updatePayment(id);
			toast.success(response.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const updateChangePayment = async (id, payment) => {
		setLoading(true);
		try {
			const previousPaymentMethod = paymentMethod;
			const response = await orderService.updateChangePayment(id, previousPaymentMethod, payment);
			toast.success(response.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const approvePayment = () => {
		updatePayment(data.id);
	};

	const handleChangePaymentMethod = (e) => {
		setSelectedPaymentMethod(e.target.value);
	};

	const updatePaymentMethod = () => {
		updateChangePayment(data.id, selectedPaymentMethod);
	};



	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>
					<div className="w-100 d-flex justify-content-between align-items-center">
						<SubTitleNamePayment paymentMethod={paymentMethod} />
						<Badge bg={payment.status == 'approved' ? "success text-decoration-line-through" : "danger "} className="fs-6">
							{formatearNumeroConPuntos(totalPrice)}
						</Badge>
					</div>
				</Accordion.Header>
				<Accordion.Body>
					<ListGroup variant="flush">
						<ListGroup.Item className="border-0 py-2">

							<hr className="my-2" />

							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Envío:</Col>
								<Col xs={6} className="text-end fw-semibold">
									{formatearNumeroConPuntos(delivery.price)}
								</Col>
							</Row>

							<hr className="my-2" />

							{/* total de los productos */}
							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Productos:</Col>
								<Col xs={6} className="text-end fw-semibold">
									{formatearNumeroConPuntos(totalPrice - delivery.price)}
								</Col>
							</Row>

							<hr className="my-2" />

							<Row className="mb-2">
								<Col xs={6} className="text-secondary">Total:</Col>
								<Col xs={6} className="text-end fw-semibold text-success">
									{formatearNumeroConPuntos(totalPrice)}
								</Col>
							</Row>

							<hr className="my-2" />
							<hr className="my-2" />

							<Row className="mb-2">
								<Col xs={8} className="text-secondary">Estado del pago:</Col>
								<Col xs={4} className="text-end fw-semibold">
									{payment.status === "approved" ? (
										<Badge bg="success">Aprobado</Badge>
									) : (
										<Badge bg="danger">Esperando</Badge>
									)}
								</Col>
							</Row>



							{
								checkUserRolesValidity([roleSelect], [ROLES.ADMIN.value, ROLES.RECEPTION.value]) &&
								<>
									{/* Botón para aprobar el pago */}
									{payment.status !== "approved" && (
										<ConfirmActionButton
											buttonLabel="Aprobar pago"
											isLoading={loading}
											onConfirm={approvePayment}
											variant="warning"
											confirmVariant="success"
											cancelVariant="danger"
										/>

									)}

									<hr />
									<hr />

									{/* select para cambiar de metodo de pago */}
									{payment.status !== "approved" && (
										<>
											< select
												className="form-select mt-2 mb-3"
												value={selectedPaymentMethod || ''}
												onChange={handleChangePaymentMethod}
												disabled={loading}
											>
												<option value={null}>Seleccionar un método de pago</option>
												{Object.values(PAYMENT_METHODS).map((method) => {
													if (!method.active) return null
													return (
														<option key={method.value} value={method.value}>
															{method.name}
														</option>
													)
												})}
											</select>

											<ConfirmActionButton
												buttonLabel="Cambiar método de pago"
												isLoading={loading}
												onConfirm={updatePaymentMethod}
												variant="warning"
												confirmVariant="success"
												cancelVariant="danger"
											/>
										</>
									)}

								</>
							}

						</ListGroup.Item>
					</ListGroup>
				</Accordion.Body>
			</Accordion.Item>
		</Accordion >
	);
};

export { PaymentInfoOrder };
