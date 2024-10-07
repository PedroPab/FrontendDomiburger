import { Card, Button, Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';

const CardCodigo = ({ data }) => {
  const { id, type, dateCreate, dateUpdate, active, userCreate, used, products, productsReward, reward, clientId, phoneClient } = data;
  const product = products.length > 0 ? products[0] : null;
  const productReward = productsReward.length > 0 ? productsReward[0] : null;

  return (
    <Card style={{ width: '100%', position: 'relative' }} className="shadow-sm p-3 mb-5 rounded">
      <Dropdown style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
          <BsThreeDots />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Más información</Dropdown.Item>
          <Dropdown.Item href="#">Compartir</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Card.Body>
        <Card.Title>{type} - Código: {id}</Card.Title>
        {product && (
          <Card.Text>
            Producto: <strong>{product.name}</strong>
            <br />
            Descripción: {product.description}
          </Card.Text>
        )}
        {productReward && (
          <Card.Text>
            Recompensa: <strong>{productReward.name}</strong>
            <br />
            Descripción: {productReward.description}
          </Card.Text>
        )}
        <Card.Text className="text-muted">Creado el: {new Date(dateCreate._seconds * 1000).toLocaleDateString()}</Card.Text>
        <Button variant="primary" onClick={() => navigator.clipboard.writeText(id)}>
          Copiar Código
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardCodigo;