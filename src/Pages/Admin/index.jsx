import LayoutAdmin from '../../Layout/Admin';
import { ADMIN_ROUTES } from '../../Utils/const/namesRutes';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

const AdminDashboard = () => {
	const rutes = Object.values(ADMIN_ROUTES.routes);
	return (
		<LayoutAdmin>
			<Container className="mt-4">
				<Row className="mb-4">
					<Col>
						<h1 className="text-center text-primary">Panel de Administración</h1>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md={8}>
						<Card>
							<Card.Header as="h5" className="bg-primary text-white">
								Rutas Disponibles
							</Card.Header>
							<ListGroup variant="flush">
								{rutes && rutes.map((rute) => (
									<ListGroup.Item key={rute} className="d-flex justify-content-between align-items-center">
										<span>{rute}</span>
										<Button variant="outline-primary" href={rute}>
											Ir
										</Button>
									</ListGroup.Item>
								))}
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</Container>
		</LayoutAdmin>
	);
}

export { AdminDashboard };
