import { useEffect, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBoxOpen } from 'react-icons/fa';
import { OrderCardV2 } from '../OrderCardV2';
import { useWorker } from '../../Context/WorkerContext';

const CarouselListCards = ({ data }) => {
	const { idOrderSelect, setIdOrderSelect } = useWorker();
	const sliderRef = useRef(null);

	useEffect(() => {
		const indexSlick = data.findIndex((pedido) => pedido.id === idOrderSelect);
		if (indexSlick !== -1 && sliderRef.current) {
			sliderRef.current.slickGoTo(indexSlick);
		} else {
			setIdOrderSelect(data[0]?.id);
		}
	}, [idOrderSelect, data]);

	const settings = {
		infinite: false,
		speed: 200,
		accessibility: false,
		arrows: false
	};

	return (
		<Container fluid className="py-3">
			<Row className="justify-content-center">
				{data && data.length > 0 ? (
					<Col xs={12} md={10} lg={8} className="h-100">
						<Slider
							{...settings}
							ref={sliderRef}
							afterChange={(index) => {
								const idSelect = data[index]?.id;
								if (idSelect) setIdOrderSelect(idSelect);
							}}
						>
							{data.map((pedido) => (
								<div key={pedido.id} className="h-100 w-100">
									<div className="d-flex align-items-center justify-content-center h-100">
										<OrderCardV2 data={pedido} className="w-100" />
									</div>
								</div>
							))}
						</Slider>
					</Col>
				) : (
					<Col xs={12} className="d-flex align-items-center justify-content-center" style={{ height: '40vh' }}>
						<div className="text-center">
							<FaBoxOpen size={50} />
							<h3>Sin pedidos</h3>
						</div>
					</Col>
				)}
			</Row>
		</Container>
	);
};

export default CarouselListCards;
