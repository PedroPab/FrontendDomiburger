import { Card } from "react-bootstrap";
import PropTypes from 'prop-types';

const CardCreate = ({ handleCardClick, messageText }) => {
  return (
    <Card
      as={"button"}
      type="button"
      className="h-100 w-100 " onClick={handleCardClick} >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <Card.Title className="fs-1">+</Card.Title>
        <Card.Text className="text-muted text-center">
          {messageText}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

CardCreate.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  messageText: PropTypes.string.isRequired,
};

export default CardCreate;
