import { Button, Card, Container } from "react-bootstrap"
import ReusableModal from "../../components/common/ReusableModal"
import { CreateLocationComponent } from "../User/CreateLocation"
import { useState } from "react"
import { LocationCard } from "../../components/Locations/LocationCard"

const ContainerCreateLocationAnonymous = ({ location, setLocation }) => {
	const [showModal, setShowModal] = useState(false)

	const successForm = (location) => {
		console.group("🚚 Location Info")
		console.log("🚀 ~ successForm ~ location:", location)
		console.groupEnd()
		setShowModal(false)

		setLocation(location)

	}

	if (!location) {
		return (
			<Card
				as={Button}
				className="mb-4 h-100 w-100"
				onClick={() => setShowModal(true)}
				bg=""
			>
				<Container>
					<h3 className="text-center">Agregar una Dirección</h3>
					<p className="text-center">Por favor, completa la información de tu ubicación.</p>

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