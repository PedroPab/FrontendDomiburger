import { Container, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import img from '../assets/img/catPc.gif';

const TemporaryClosure = () => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center p-4">
			<Container>
				<h1 className="display-4 mb-3">Estamos en mantenimiento 🛠️</h1>
				<p className="lead mb-4">
					Actualmente estamos trabajando para mejorar tu experiencia. Mientras tanto, puedes hacer tus pedidos por WhatsApp.
				</p>

				<Button
					variant="success"
					size="lg"
					href="https://wa.me/573506186772?text=Hola,%20para%20hacer%20un%20pedido"
					target="_blank"
					rel="noopener noreferrer"
					className="d-flex align-items-center gap-2 mb-4 mx-auto"
				>
					<FaWhatsapp size={24} />
					Hacer pedido por WhatsApp
				</Button>

				<div className="w-100">
					<img
						src={img}
						alt="Mantenimiento"
						className="img-fluid rounded shadow-sm"
						style={{ maxHeight: '400px' }}
					/>
				</div>
			</Container>
		</div>
	);
};

export { TemporaryClosure };
