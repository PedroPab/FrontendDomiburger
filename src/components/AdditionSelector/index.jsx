import { useState, useEffect } from 'react';
import { Button, Modal, Card, Row, Col } from 'react-bootstrap';

const AdditionSelector = ({ producto, adiciones, onChangeSelect }) => {
	const [show, setShow] = useState(false);
	const [filteredAdiciones, setFilteredAdiciones] = useState(adiciones);

	// Cada vez que abra el modal, reiniciamos el filtrado
	useEffect(() => {
		if (show) {
			setFilteredAdiciones(adiciones);
		}
	}, [show, adiciones]);

	const handleSelect = (additionItem) => {
		onChangeSelect(additionItem.id, producto.idInter);
		setShow(false);
	};

	return (
		<>
			<Button variant="primary" onClick={() => setShow(true)}>
				Seleccionar Adición
			</Button>

			<Modal show={show} onHide={() => setShow(false)} size="lg" centered>
				<Modal.Header closeButton>
					<Modal.Title>Elige una adición</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className="text-muted text-center">
						Selecciona una adición para el producto <strong>{producto.name}</strong>
					</p>

					<input
						type="text"
						placeholder="Buscar adición..."
						className="form-control mb-3"
						onChange={(e) => {
							const q = e.target.value.toLowerCase().trim();
							setFilteredAdiciones(
								adiciones.filter((add) =>
									add.name.toLowerCase().includes(q)
								)
							);
						}}
					/>

					<Row>
						{filteredAdiciones.map((add) => (
							<Col key={add.id} xs={6} sm={6} md={4} className="mb-3">
								<CardProductResumid product={add} onClick={handleSelect} />
							</Col>
						))}

						{filteredAdiciones.length === 0 && (
							<Col>
								<p className="text-center text-muted">No se encontraron adiciones.</p>
							</Col>
						)}
					</Row>
				</Modal.Body>
			</Modal>
		</>
	);
};

const CardProductResumid = ({ product, onClick }) => (
	<button
		// type="button"
		className="card p-0 h-100 w-100"
		onClick={() => onClick(product)}
		onKeyPress={(e) => {
			if (e.key === 'Enter' || e.key === ' ') onClick(product);
		}}
		style={{ cursor: 'pointer', border: 'none', background: 'none' }}
	>
		<Card
		>
			{/* {product.photos?.[0] && (
				<Card.Img
					variant="top"
					src={product.photos[0]}
					style={{ height: 120, objectFit: 'cover' }}
				/>
			)} */}
			<Card.Body>
				<Card.Title>{product.name}</Card.Title>
				<Card.Text className="mb-1 text-truncate">{product.description}</Card.Text>
				<Card.Text className="fw-bold">${product.price.toLocaleString()}</Card.Text>
				<div
					style={{
						backgroundColor: product.colorPrimary,
						width: '100%',
						height: '6px',
						borderRadius: '3px',
					}}
				/>
			</Card.Body>
		</Card>
	</button>
);

export { AdditionSelector };
