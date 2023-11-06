import { useDrag } from 'react-dnd';

const Card = ({ text }) => {
  const [, ref] = useDrag({
    type: 'CARD',
  });

  return (
    <div ref={ref} style={{ border: '1px solid #ccc', padding: '8px', marginBottom: '8px' }}>
      {text}
    </div>
  );
};

const FloatingBox = () => {
  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid #ccc', padding: '16px', background: '#fff' }}>
      <h2>Flotante</h2>
      <Card text="Card 1" />
      <Card text="Card 2" />
      <Card text="Card 3" />
    </div>
  );
};

export default FloatingBox;
