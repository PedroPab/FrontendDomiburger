import { useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
// import { BsPlus, BsDash } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';

const CardProduct = ({ img }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => setCount((prevCount) => prevCount + 1);
  const decrementCount = () => setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));

  return (
    <Card className="  flex justify-between" style={{ width: '100%' }}>
      <Card.Body style={{ width: '100%', padding: '10px' }} className="d-flex justify-content-between align-items-center">
        <Image src={img} alt="Burger" style={{ width: '5rem', height: '5rem' }} />
        <div className="d-flex align-items-center justify-content-evenly" style={{ width: '100%' }}>
          <Button variant="" style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', }} onClick={decrementCount} className="rounded-button">            <FaMinus />
          </Button>
          <span >{count}</span>

          <Button variant="" style={{ borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', }} onClick={incrementCount} className="rounded-button">            <FaPlus />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardProduct;
