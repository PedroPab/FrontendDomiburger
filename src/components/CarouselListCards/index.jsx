import { useEffect, useRef } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBoxOpen } from 'react-icons/fa';
import { OrderCardV2 } from '../OrderCardV2';
import { useWorker } from '../../Context/WorkerContext';

const CarouselListCards = ({ data, vertical = false }) => {
  const { idOrderSelect, setIdOrderSelect } = useWorker();
  const sliderRef = useRef(null);
  const selectedRef = useRef(null);

  useEffect(() => {
    if (vertical) {
      // En modo vertical, hacer scroll al elemento seleccionado
      if (selectedRef.current) {
        selectedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      // En modo carousel, usar slickGoTo
      const indexSlick = data.findIndex((pedido) => pedido.id === idOrderSelect);
      if (indexSlick !== -1 && sliderRef.current) {
        sliderRef.current.slickGoTo(indexSlick);
      } else {
        setIdOrderSelect(data[0]?.id);
      }
    }
  }, [idOrderSelect, data, vertical]);

  const settings = {
    infinite: false,
    speed: 200,
    accessibility: false,
    arrows: false
  };

  // Mensaje cuando no hay datos
  if (!data || data.length === 0) {
    return (
      <Container fluid className="py-3">
        <Row className="justify-content-center">
          <Col xs={12} className="d-flex align-items-center justify-content-center" style={{ height: '40vh' }}>
            <div className="text-center">
              <FaBoxOpen size={50} />
              <h3>Sin pedidos</h3>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  // Modo vertical (lista scrolleable) para desktop
  if (vertical) {
    return (
      <div
        className="d-flex flex-column gap-3 p-3 overflow-auto"
        style={{ maxHeight: '85vh' }}
      >
        {data.map((pedido) => (
          <div
            key={pedido.id}
            ref={pedido.id === idOrderSelect ? selectedRef : null}
            onClick={() => setIdOrderSelect(pedido.id)}
            className={`cursor-pointer ${pedido.id === idOrderSelect ? 'border border-primary border-2 rounded' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <OrderCardV2 data={pedido} />
          </div>
        ))}
      </div>
    );
  }

  // Modo carousel (horizontal) para móvil
  return (
    <Container fluid className="py-3">
      <Row className="justify-content-center">
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
      </Row>
    </Container>
  );
};

export default CarouselListCards;
