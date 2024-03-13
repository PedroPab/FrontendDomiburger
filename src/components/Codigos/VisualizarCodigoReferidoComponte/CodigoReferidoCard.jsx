import { Card, Col, Dropdown, } from 'react-bootstrap';
import { FaUsers, FaAward, } from 'react-icons/fa';
import InfoIcon from '../../InfoIcon';
import { Link } from 'react-router-dom';
import ModalDetallesCodigo from '../ModalDetallesCodigo';
import { useState } from 'react';

const CodigoReferidoCard = ({ codigo: referido }) => {
  const [showMasDetalles, setShowMasDetalles] = useState(false)
  return (
    <Col xs={12} sm={6} md={4} lg={2} className="mt-2">
      <Card className="shadow h-100 position-relative">
        <Card.Body>
          <Card.Title className="text-center display-4 mt-2 mb-3 text-nowrap overflow-hidden text-truncate">{referido.id}</Card.Title>

          <Card.Subtitle
            className="mb-2 d-flex justify-content-around "
          >
            <InfoIcon Icon={FaUsers} title="" number={referido.used.length} />
            <InfoIcon Icon={FaAward} title="" number={referido.reward.length} />
          </Card.Subtitle>

          <Dropdown className="d-inline-block w-100">
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className='w-100'>
              Mas
            </Dropdown.Toggle>

            <Dropdown.Menu className=' w-100'>
              <Dropdown.Item onClick={() => setShowMasDetalles(!showMasDetalles)} >Ver detalles</Dropdown.Item>
              {/* ir al /clientes/id con router dom*/}
              <Dropdown.Item as={Link} to={`/clientes/${referido.clientId}`}>Ver cliente</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/codigos/editar/${referido.id}`}>Editar {referido.id}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
      <ModalDetallesCodigo
        show={showMasDetalles}
        handleClose={() => setShowMasDetalles(!showMasDetalles)}
        data={referido}
      />
    </Col>
  );
};

export default CodigoReferidoCard;
