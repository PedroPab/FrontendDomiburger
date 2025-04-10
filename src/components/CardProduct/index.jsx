import React from 'react';
import { Card, Button, Image, Row, Col } from 'react-bootstrap';
import { FaMinus, FaPlus } from 'react-icons/fa';
import InfoButton from '../InfoButton';
import RainbowBadge from './RainbowBadge';

const CardProduct = ({
	img,
	count,
	incrementCount,
	decrementCount,
	title,
	description,
	isNew = false,
	toggleInfo,
	moreInfo,
}) => {
	return (
		<Card className="border-0 shadow-lg p-3 rounded-4 d-flex flex-row align-items-center position-relative">
			<Row className="g-0 w-100">
				{/* Columna Izquierda: Imagen del producto con 40% disponible */}
				<Col
					className="d-flex justify-content-center align-items-center"
					style={{ flex: '0 0 40%' }}
				>
					{isNew && <RainbowBadge />}

					<div className="position-relative">
						{/* Badge "NUEVO" sobre la imagen, si aplica */}
						<Image
							src={img}
							alt={title}
							roundedCircle
							className="shadow-lg border border-2 border-white"
							style={{
								width: '7rem',
								height: '7rem',
								objectFit: 'cover',
								cursor: 'pointer',
								transition: 'transform 0.3s ease-in-out',
							}}
							onClick={incrementCount}
							onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
							onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
						/>
					</div>
				</Col>

				{/* Columna Derecha: Información y controles */}
				<Col className="d-flex flex-column justify-content-between">
					{/* Encabezado: Título, botón de información y descripción */}
					<div className="mb-2">
						<div className="d-flex justify-content-between align-items-start">
							<h5 className="fw-bold mb-1">{title}</h5>
							{/* Botón de información en la esquina superior derecha */}
							<InfoButton textInfo={moreInfo} color="primary" onClick={toggleInfo} />
						</div>
						<p className="text-muted small mb-0">{description}</p>
					</div>

					{/* Controles de cantidad: botones y contador */}
					<div className="d-flex justify-content-center align-items-center gap-3">
						<Button
							variant="danger"
							className="rounded-circle shadow"
							style={{
								width: '40px',
								height: '40px',
								transition: 'all 0.2s ease-in-out',
							}}
							onClick={decrementCount}
							disabled={count === 0}
							aria-label="Disminuir cantidad"
							onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
							onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
						>
							<FaMinus />
						</Button>
						<span className="fw-bold fs-4">{count}</span>
						<Button
							variant="success"
							className="rounded-circle shadow"
							style={{
								width: '40px',
								height: '40px',
								transition: 'all 0.2s ease-in-out',
							}}
							onClick={incrementCount}
							aria-label="Aumentar cantidad"
							onMouseOver={(e) => (e.target.style.transform = 'scale(1.1)')}
							onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
						>
							<FaPlus />
						</Button>
					</div>
				</Col>
			</Row>
		</Card>
	);
};

export default CardProduct;
