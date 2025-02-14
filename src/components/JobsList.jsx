import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const JobsList = ({ rolesOptions }) => {
  if (!rolesOptions || rolesOptions.length === 0) return null;

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Trabajos</h3>
      <Row className="g-4">
        {rolesOptions.map((role, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <Card className="shadow-lg border-0 rounded text-center h-100">
              <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                <Card.Title className="mb-3">{role}</Card.Title>
                <Link to={`/${role}`}>
                  <Button variant="primary">Ver más</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default JobsList;
