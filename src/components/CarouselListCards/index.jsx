import { useEffect, useRef } from 'react'
import { Col, Container, Row } from "react-bootstrap"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBoxOpen } from 'react-icons/fa';
import { OrderCardV2 } from '../OrderCardV2';
import { useWorker } from '../../Context/WorkerContext';

const CarouselListCards = ({ data }) => {
	const { idOrderSelect, setIdOrderSelect } = useWorker()
	const sliderRef = useRef(null); // Crea una referencia para el Slider

	useEffect(() => {
		sliderRef.current.slickGoTo(idOrderSelect);
	}, [idOrderSelect])

	const settings = {
		infinite: false,
		speed: 200,
		accessibility: false,
		arrows: false
	};

	return (
		<>
			<Slider {...settings}
				ref={sliderRef}
				afterChange={(index) => {
					const idSelect = data[index].id
					setIdOrderSelect(idSelect)
				}}
			>
				{
					(data && data.length > 0) ?
						data.map((pedido) => (
							<div
								key={pedido.id}
							>
								<div
									className="d-flex "
								>
									<OrderCardV2
										data={pedido}
									/>
								</div>
							</div>
						)) :
						<>
							<Container fluid style={{ height: '40vh' }} className=" d-flex align-items-center justify-content-center">
								<Row>
									<Col className="text-center">
										<FaBoxOpen size={50} />
										<h3>Sin pedidos</h3>
									</Col>
								</Row>
							</Container>
						</>
				}
			</Slider>
		</>
	)
}

export default CarouselListCards