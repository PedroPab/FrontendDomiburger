import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import img from '../assets/img/catPc.gif';
import { UserLayout } from '../Layout/UserLayout';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TemporaryClosure = () => {
	const [countClick, setCountClick] = useState(0);
	const navigate = useNavigate();
	const handleClick = () => {
		setCountClick(countClick + 1);

		if (countClick >= 5) {
			// alert('¡Has hecho clic más de 5 veces!');
			navigate('/login'); // Redirigir a la página de inicio
			setCountClick(0);
		}
	};
	return (
		<UserLayout>
			<Container
				fluid
				className="vh-100 d-flex flex-column justify-content-center align-items-center text-center p-4"
			>
				{/* Encabezado */}
				<Row className="mb-4">
					<Col>
						<h1 className="display-4">Estamos en mantenimiento
							<span role="img" aria-label="cat" onClick={handleClick}>
								🛠️
							</span>
						</h1>
						<p className="lead">
							Actualmente estamos trabajando para mejorar tu experiencia. Mientras tanto, puedes hacer tus pedidos por WhatsApp.
						</p>
					</Col>
				</Row>

				{/* Botones */}
				<Row className="mb-4">
					<Col xs={12} md="auto" className="mb-3 mb-md-0">
						<Button
							variant="success"
							size="lg"
							href="https://wa.me/573506186772?text=Hola,%20para%20hacer%20un%20pedido"
							target="_blank"
							rel="noopener noreferrer"
							className="d-flex align-items-center gap-2"
						>
							<FaWhatsapp size={24} />
							Hacer pedido por WhatsApp
						</Button>
					</Col>
					<Col xs={12} md="auto">

					</Col>
				</Row>

				{/* Imagen */}
				<Row>
					<Col>
						<img
							src={img}
							alt="Mantenimiento"
							className="img-fluid rounded shadow-sm"
							style={{ maxHeight: '400px' }}
						/>
					</Col>
				</Row>
			</Container>
		</UserLayout>
	);
};

export { TemporaryClosure };
