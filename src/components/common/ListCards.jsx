import { Alert, Col, Row, Spinner } from "react-bootstrap"
import CardCreate from "./CardCreate"

const ListCardsElements = ({
	elements = [],
	loading = false,
	error = null,
	handleCardClick,
	CardComponent,
	messageText = 'Crear un nuevo elemento',
	emptyMessage = 'No hay elementos para mostrar'
}) => {

	return (
		<Row className="g-3 mt-4 mb-4">
			{/* Tarjeta para crear un nuevo producto */}
			<Col xs={12} sm={4} lg={3}>
				<CardCreate handleCardClick={handleCardClick} messageText={messageText} />
			</Col>

			{/* Estado de carga */}
			{loading && (
				<Col xs={12} className="text-center">
					<Spinner animation="border" variant="primary" role="status">
						<span className="visually-hidden">Cargando...</span>
					</Spinner>
				</Col>
			)}

			{/* Estado de error */}
			{error && (
				<Col xs={12}>
					<Alert variant="danger" className="text-center">
						Ocurrió un error: {error}
					</Alert>
				</Col>
			)}

			{/* Lista de elementos */}
			{!loading && !error && elements.length === 0 ? (
				<Col xs={12}>
					<Alert variant="warning" className="text-center">
						{emptyMessage}
					</Alert>
				</Col>
			) : (
				elements.map((element) => (
					<Col xs={12} sm={6} lg={4} key={element.id}>
						<CardComponent element={element} />
					</Col>
				))
			)}
		</Row>
	)
}

export { ListCardsElements }
