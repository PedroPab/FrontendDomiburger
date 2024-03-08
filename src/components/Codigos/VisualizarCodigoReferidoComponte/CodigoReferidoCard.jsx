import { Card, Col, Dropdown, } from 'react-bootstrap';
import { FaUsers, FaAward, } from 'react-icons/fa';
import InfoIcon from '../../InfoIcon';

const CodigoReferidoCard = ({ codigo: referido }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={2} className="mt-4">
      <Card className="shadow h-100 position-relative">
        <Card.Body>
          <Card.Title className="text-center display-4 mt-2 mb-3 text-nowrap overflow-hidden text-truncate">{referido.id}</Card.Title>

          <Card.Subtitle
            className="mb-2 d-flex justify-content-around "
          >
            <InfoIcon Icon={FaAward} title="" number={referido.reward.length} />
            <InfoIcon Icon={FaUsers} title="" number={referido.used.length} />

          </Card.Subtitle>

          <Dropdown className="d-inline-block w-100">
            <Dropdown.Toggle variant="primary" id="dropdown-basic" className='w-100'>
              Mas
            </Dropdown.Toggle>

            <Dropdown.Menu className=' w-100'>
              <Dropdown.Item >Ver detalles</Dropdown.Item>
              <Dropdown.Item >Ver cliente</Dropdown.Item>
              <Dropdown.Item >Editar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CodigoReferidoCard;
