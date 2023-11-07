import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const CarouselCard = ({ index, card, activeIndex, setActiveIndex }) => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(({ down, movement: [mx], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 4) {
      cancel(set({ x: 0 }));
      if (xDir < 0) setActiveIndex((prev) => (prev === index ? prev + 1 : prev));
      if (xDir > 0) setActiveIndex((prev) => (prev === index ? prev - 1 : prev));
    } else {
      set({ x: down ? mx : 0 });
    }
  });

  const isActive = activeIndex === index;

  return (
    <animated.div {...bind()} style={{ x, touchAction: 'none' }}>
      <div className={`card ${isActive ? 'active' : ''}`}>{card}</div>
    </animated.div>
  );
};

export default CarouselCard;
