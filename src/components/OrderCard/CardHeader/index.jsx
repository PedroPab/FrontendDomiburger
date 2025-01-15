import { CardTitle, Button, Badge, ButtonGroup } from 'react-bootstrap';

import { SlCallOut } from "react-icons/sl";
import { BiMap } from "react-icons/bi";


const CardHeader = ({ title, orden, horaCreate, horaPronostico, urlMap, urlPhone }) => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <small className="text-muted">{horaCreate}</small>
        <small className="text-muted">{horaPronostico}</small>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Badge className='fs-6' bg="secondary">{orden}</Badge>
        <CardTitle>{title}</CardTitle>
        <ButtonGroup >
          <a href={urlPhone} target="_blank" rel="noreferrer" >
            <Button size="sm" variant="outline-info" >
              <SlCallOut />
            </Button>
          </a>
          <a href={urlMap} target="_blank" rel="noreferrer">
            <Button size="sm" variant="outline-primary" >
              <BiMap />
            </Button>
          </a>
        </ButtonGroup>
      </div>
    </>
  );
};

export { CardHeader }