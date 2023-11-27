import { useContext, useEffect, useRef } from 'react'
import { MiContexto } from '../../Context'
import { Col, Container, Row } from "react-bootstrap"
import OrderCard from "../OrderCard"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaBoxOpen } from 'react-icons/fa';

const CarouselListCards = ({ data }) => {
  const context = useContext(MiContexto)
  const sliderRef = useRef(null); // Crea una referencia para el Slider
  //cada vez que se camien el index se cambian mualmente el
  useEffect(() => {
    sliderRef.current.slickGoTo(context.indexItems);
  }, [context.indexItems])

  const settings = {
    infinite: false,
    speed: 200,
    accessibility: false,
    arrows: false
  };

  return (
    <>
      <Slider {...settings} ref={sliderRef}>
        {
          (data && data.length > 0) ?
            data.map((pedido) => (
              <div
                key={pedido.id}
              >
                <div
                  className="d-flex "
                >
                  <OrderCard
                    dataPedido={pedido}
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