import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './Carousel.css';
import { useRef } from 'react';

const Carousel = ({ cards }) => {
  const sliderRef = useRef(null); // Crea una referencia para el Slider

  const goToSlide = (index) => {
    console.log("🚀 ~ file: index.jsx:12 ~ goToSlide ~ sliderRef:", sliderRef)

    sliderRef.current.slickGoTo(index); // Utiliza el método slickGoTo para cambiar el índice
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  return (
    <div className="carousel-container">
      <button onClick={() => goToSlide(2)}>Ir al Slide 3</button>
      <Slider {...settings}
        ref={sliderRef}>
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
