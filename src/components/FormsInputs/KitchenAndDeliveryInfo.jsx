import React, { useEffect, useState } from 'react';
import { Spinner, Card, Row, Col, Container, Alert } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import { KitchenService } from '../../apis/clientV2/KitchenService';
import { toast } from 'react-toastify';

const KitchenAndDeliveryInfo = ({
	kitchen,
	setKitchen,
	delivery,
	setDelivery,
	kitchenIdSelect,
	locationIdSelect,
}) => {
	const [loading, setLoading] = useState(false);
	const { token } = useAuth();
	const kitchenService = new KitchenService(token);

	useEffect(() => {
		if (!locationIdSelect) return;

		const fetchKitchenAndDelivery = async () => {
			setDelivery(null);
			setKitchen(null);
			try {
				const response = await kitchenService.getSelectKitchen(locationIdSelect, kitchenIdSelect);
				const data = response.data.body;
				setDelivery(data.delivery || null);
				setKitchen(data.kitchen || null);
			} catch (error) {
				toast.error('Error obteniendo la información de la cocina.');
				setDelivery(null);
				setKitchen(null);
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		setLoading(true);
		fetchKitchenAndDelivery();
	}, [locationIdSelect, kitchenIdSelect]);

	return (
		<Container className="my-4">
			<h3 className="text-center mb-4">Información de Cocina y Delivery</h3>
			{loading ? (
				<div className="d-flex justify-content-center my-4">
					<Spinner animation="border" variant="primary" />
				</div>
			) : (
				<>
					{!kitchen && !delivery && (
						<Alert variant="info" className="text-center">
							No se encontró información para mostrar.
						</Alert>
					)}
					<Row>
						{kitchen && (
							<Col md={6} className="mb-3">
								<Card border="primary" className="shadow-sm">
									<Card.Header as="h5" className="bg-primary text-white">
										Cocina
									</Card.Header>
									<Card.Body>
										<Card.Title>{kitchen.name}</Card.Title>
										<Card.Text>
											<strong>ID:</strong> {kitchen.id} <br />
											<strong>Dirección:</strong> {kitchen.address || 'No disponible'} <br />
											<strong>Teléfono:</strong> {kitchen.phone || 'N/A'} <br />
											<strong>Órdenes Diarias:</strong> {kitchen.dailyOrders || 0}
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						)}
						{delivery && (
							<Col md={6} className="mb-3">
								<Card border="success" className="shadow-sm">
									<Card.Header as="h5" className="bg-success text-white">
										Delivery
									</Card.Header>
									<Card.Body>
										<Card.Text>
											<strong>Precio:</strong> {delivery.price} COP <br />
											<strong>Distancia:</strong> {delivery.distance} metros <br />
											<strong>Duración:</strong> {delivery.duration} segundos
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						)}
					</Row>
				</>
			)}
		</Container>
	);
};

export default KitchenAndDeliveryInfo;
