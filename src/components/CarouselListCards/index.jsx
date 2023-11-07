import { useContext, useEffect, useRef } from 'react'
import { MiContexto } from '../../Context'
import { Carousel } from "react-bootstrap"
import OrderCard from "../OrderCard"
import Slider from 'react-slick'

const CarouselListCards = ({ data }) => {
  const context = useContext(MiContexto)
  const sliderRef = useRef(null); // Crea una referencia para el Slider

  //cada vez que se camien el index se cambian mualmente el
  useEffect(() => {
    sliderRef.current.slickGoTo(context.indexItems);
  }, [context.indexItems])

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <>
      <Slider {...settings} ref={sliderRef}>
        {
          data ?
            data.map((pedido, i) => (
              <Carousel.Item
                key={i}
              >
                <div
                  className="d-flex justify-content-around"
                >
                  <OrderCard
                    dataPedido={pedido.data}
                  />
                </div>
              </Carousel.Item>
            )) :
            <></>
        }
      </Slider>
    </>
  )
}

export default CarouselListCards