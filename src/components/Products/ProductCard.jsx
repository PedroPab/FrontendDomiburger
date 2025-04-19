import { Card } from 'react-bootstrap';
import imgDefault from '../../assets/img/photoGeneric.jpg'; // Importa la imagen por defecto
import { DisabledComponent } from '../common/DisabledComponent';
const ProductCard = ({ element }) => {
	const product = element;
	// Asignar la imagen: se utiliza la primera foto o la imagen por defecto
	const imageUrl = element?.photos?.[0] || imgDefault;

	return (
		<Card>
			{/* header */}
			<Card.Header className="d-flex justify-content-center align-items-center">
				{/* imagen */}
				<Card.Img
					variant="top"
					src={imageUrl || 'https://via.placeholder.com/150'}
					alt={product.name}
					style={{ width: '100%', height: '200px', objectFit: 'cover' }}
				/>
			</Card.Header>
			<Card.Body>
				<Card.Title>{product.name}</Card.Title>
				<Card.Text className="mb-1">{product.description}</Card.Text>
				<Card.Text className="fw-bold">${product.price.toLocaleString()}</Card.Text>

				{/* si es secreto */}
				{product.secret && (
					<Card.Text className="text-danger fw-bold">¡SECRETO!</Card.Text>
				)}

				{/* color primary */}
				<div
					className='mb-1'
					style={{
						backgroundColor: product.colorPrimary,
						width: '100%',
						height: '6px',
						borderRadius: '3px',
					}}
				/>
				{/* color secondary */}
				<div
					style={{
						backgroundColor: product.colorSecondary,
						width: '100%',
						height: '6px',
						borderRadius: '3px',
					}}
				/>
			</Card.Body>
			{/* footer */}
			<Card.Footer className="d-flex justify-content-between align-items-center">
				{/* ver mas */}
				<DisabledComponent
					message={'Esta funcionalidad estará disponible próximamente'}>
					<button className="btn btn-outline-primary" onClick={() => { }}> Ver mas </button>
				</DisabledComponent>
				<button className="btn btn-outline-success">Editar</button>
			</Card.Footer>
		</Card>
	);
};

export { ProductCard };
