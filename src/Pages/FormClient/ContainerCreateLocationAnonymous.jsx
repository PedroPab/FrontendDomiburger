import { Button, Card, Container } from "react-bootstrap"
import ReusableModal from "../../components/common/ReusableModal"
import { CreateLocationComponent } from "../User/CreateLocation"
import { useState } from "react"
import { LocationCard } from "../../components/Locations/LocationCard"

const ContainerCreateLocationAnonymous = ({ location, setLocation }) => {
	const [showModal, setShowModal] = useState(false)

	const successForm = (location) => {
		setShowModal(false)
		setLocation(location)
	}

	if (!location) {
		return (
			<Card className="mb-4 p-4 shadow-sm border-0 text-center h-100 d-flex justify-content-center align-items-center">
				<Container>
					<h4 className="fw-bold mb-3">📍 ¡Necesitamos tu dirección!</h4>
					<p className="mb-4 text-muted">
						Aún no has agregado una dirección. Para continuar, por favor haz clic en el botón.
					</p>
					<Button
						type="button"
						variant="primary"
						size="lg"
						className="px-4 py-2"
						onClick={() => setShowModal(true)}
					>
						📬 Crear Dirección
					</Button>

					{/* Modal para crear nueva ubicación */}
					<ReusableModal
						show={showModal}
						handleClose={() => setShowModal(false)}
						title="Crear nueva ubicación"
					>
						<CreateLocationComponent successForm={successForm} />
					</ReusableModal>
				</Container>
			</Card>
		)
	}

	return (
		<>
			<LocationCard location={location} />
		</>
	)
}

export { ContainerCreateLocationAnonymous }
