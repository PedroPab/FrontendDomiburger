import { Card } from 'react-bootstrap';
import imgDefault from '../../assets/img/photoGeneric.jpg'; // Importa la imagen por defecto
import { DisabledComponent } from '../common/DisabledComponent';
import ReusableModal from '../common/ReusableModal';
import { useState } from 'react';
import { ItemProductBadge } from './ItemProductBadge';
import { UpdateProduct } from './UpdateProduct';
const ProductCard = ({ element }) => {
  const product = element;
  // Asignar la imagen: se utiliza la primera foto o la imagen por defecto
  const imageUrl = element?.photos?.[0] || imgDefault;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  return (
    <Card>
      {/* header */}
      <Card.Header className="d-flex justify-content-center align-items-center">
        {/* imagen */}
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted mb-2">
          <ItemProductBadge name={product.name} color={product.colorPrimary} />
        </Card.Text>
        <Card.Text className="mb-1">{product.description}</Card.Text>
        <Card.Text className="fw-bold">${product.price.toLocaleString()}</Card.Text>

        {/* type */}
        <Card.Text className="text-muted">
          {product.type === 'complement' ? 'Adición' : 'Producto'}
        </Card.Text>
        {/* si es secreto */}
        {product.secret && (
          <Card.Text className="text-danger fw-bold">¡SECRETO!</Card.Text>
        )}

        {/* color primary */}
        <div
          className='mb-1'
          style={{
            backgroundColor: product.colorPrimary,
            width: '100%',
            height: '6px',
            borderRadius: '3px',
          }}
        />
        {/* color secondary */}
        <div
          style={{
            backgroundColor: product.colorSecondary,
            width: '100%',
            height: '6px',
            borderRadius: '3px',
          }}
        />
      </Card.Body>
      {/* footer */}
      <Card.Footer className="d-flex justify-content-between align-items-center">
        {/* ver mas */}
        <DisabledComponent
          message={'Esta funcionalidad estará disponible próximamente'}>
          <button className="btn btn-outline-primary" onClick={() => { }}> Ver mas </button>
        </DisabledComponent>
        <button className="btn btn-outline-success" onClick={() => setShow(true)} >Editar</button>
      </Card.Footer>
      <ReusableModal show={show} handleClose={handleClose} title="Editar Producto">
        {/* Aquí puedes agregar el contenido del modal */}
        <UpdateProduct product={product} handleClose={handleClose} />
      </ReusableModal>
    </Card>
  );
};

export { ProductCard };
