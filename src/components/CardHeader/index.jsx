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
        <Badge bg="secondary">{orden}</Badge>


        <CardTitle>{title}</CardTitle>
        <ButtonGroup aria-label="Basic example">
          <Button size="sm" variant="outline-success" href={urlMap}>
            <SlCallOut />
          </Button>
          <Button size="sm" variant="outline-primary" href={urlPhone}>
            <BiMap />
          </Button>
        </ButtonGroup>

      </div>
    </>
  );
};

export { CardHeader }