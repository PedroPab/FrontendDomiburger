import { useState } from 'react';
import './CardSlider.css';

const CardSlider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (direction === 'right' && currentIndex < cards.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="card-slider-container">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${index === currentIndex ? 'active' : ''}`}
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
            const touchMoveHandler = (e) => {
              const deltaX = e.touches[0].clientX - startX;
              if (Math.abs(deltaX) > 50) {
                handleSwipe(deltaX > 0 ? 'right' : 'left');
              }
              document.removeEventListener('touchmove', touchMoveHandler);
            };
            document.addEventListener('touchmove', touchMoveHandler);
          }}
        >
          {card}
        </div>
      ))}
    </div>
  );
};

export default CardSlider;
