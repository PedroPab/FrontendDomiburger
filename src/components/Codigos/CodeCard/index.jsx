import { useState } from 'react';
import { Card, Button, Collapse, ListGroup } from 'react-bootstrap';
import { FaTimes, FaCheck } from 'react-icons/fa';
import dayjs from 'dayjs';

const CodeCard = ({ code, deleteCode }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggleAdd = () => {
    setIsAdded(!isAdded);
  };

  const handleToggleDetails = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    deleteCode()
    // Aquí puedes implementar la lógica para eliminar la card del estado del componente padre.
  };

  const formatDate = (seconds, nanoseconds) => {
    return dayjs(seconds * 1000 + nanoseconds / 1000000).format('DD/MM/YYYY HH:mm');
  };

  return (
    <Card style={{ width: '100%', position: 'relative', padding: '10px' }}>
      <Button
        variant=""
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        onClick={handleDelete}
      >
        <FaTimes />
      </Button>

      <Card.Body>
        <Card.Title
          className='mb-3'
          onClick={handleToggleDetails} style={{ cursor: 'pointer' }}>
          {code.id} ({code.type})
        </Card.Title>

        <Collapse in={open} className='mb-3'>
          <div>
            <p>Creado: {formatDate(code.dateCreate._seconds, code.dateCreate._nanoseconds)}</p>
            <p>Actualizado: {formatDate(code.dateUpdate._seconds, code.dateUpdate._nanoseconds)}</p>
            <p>Cliente: {code.clientId}</p>
            <p>Teléfono: {code.phoneClient}</p>

            <h6>Productos:</h6>
            <ListGroup>
              {code.products.map((product) => (
                <ListGroup.Item key={product.id}>
                  <img
                    src={product.imagen}
                    alt={product.name}
                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                  />
                  {product.name} - {product.description}
                </ListGroup.Item>
              ))}
            </ListGroup>

            <h6>Recompensas:</h6>
            <ListGroup>
              {code.productsReward.map((reward) => (
                <ListGroup.Item key={reward.id}>
                  <img
                    src={reward.imagen}
                    alt={reward.name}
                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                  />
                  {reward.name} - {reward.description}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Collapse>

        <Button
          variant={isAdded ? 'danger' : 'primary'}
          onClick={handleToggleAdd}
          style={{ marginRight: '10px' }}
        >
          {isAdded ? 'Retirar' : 'Agregar'}
        </Button>

        {isAdded && <FaCheck style={{ color: 'green', fontSize: '24px' }} />}
      </Card.Body>
    </Card>
  );
};

export default CodeCard;
