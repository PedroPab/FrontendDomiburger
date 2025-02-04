import { Card } from 'react-bootstrap';

const LocationCard = ({ location }) => {
  // Se extraen los campos de la ubicación. Se utiliza el campo "name" o, en su defecto, se muestra el "id".
  const { id, name, address, comment, propertyType, floor } = location;

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body>
        <Card.Title>{name || `ID: ${id}`}</Card.Title>
        <Card.Text>
          <strong>Dirección:</strong> {address || 'No especificada'}<br />
          <strong>Nota:</strong> {comment || 'Sin nota'}<br />
          <strong>Tipo:</strong> {propertyType || 'No definido'}<br />
          <strong>Piso:</strong> {floor || 'No indicado'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default LocationCard;
