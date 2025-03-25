import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ConfirmActionButton } from "./../../common/ConfirmActionButton";
import { useDeleteOrder } from "../../../hooks/api/order/useDeleteOrder";

const ButtonDeleteOrder = ({ id, changeSucceed }) => {
	const { deleteOrder, loading, error, data } = useDeleteOrder();

	useEffect(() => {
		if (data) {
			changeSucceed();
		}
	}, [data, changeSucceed]);

	useEffect(() => {
		if (error) {
			toast.error(`Error deleting order: ${error?.message}`);
		}
	}, [error]);

	const handleDelete = async () => {
		await deleteOrder(id);
	};

	return (
		<Container className="mt-4">
			<Row className="justify-content-md-center">
				<Col md={6}>
					<Card>
						<Card.Header as="h5">Delete Order</Card.Header>
						<Card.Body>
							<p>Tomate un tiempo para reflexionar, en verdad quire borrar esta order?</p>
							<p>Ninguna orden se borra realmente , solo se cambia al estado de eliminado, ten eso en cuenta</p>
							{error && (
								<Alert variant="danger" className="mt-3">
									{error?.message}
								</Alert>
							)}
							{data ? (
								<Button variant="danger" disabled block>
									Deleted
								</Button>
							) : (
								<Row className="justify-content-end">
									<Col xs="auto">
										<ConfirmActionButton
											buttonLabel="Delete"
											isLoading={loading}
											onConfirm={handleDelete}
											confirmText="Accept"
											cancelText="Cancel"
											variant="danger"          // Variante para el botón principal
											confirmVariant="danger"   // Variante para el botón de confirmar
											cancelVariant="primary"   // Variante para el botón de cancelar
										/>
									</Col>
								</Row>
							)}
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export { ButtonDeleteOrder };
