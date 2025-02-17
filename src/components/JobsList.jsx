import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { usePreferences } from "../Context/PreferencesContext";
import { ROLES } from "../Utils/const/roles";

const JobsList = ({ rolesOptions }) => {
  const { roleSelect, setRoleSelect } = usePreferences();
  if (!rolesOptions || rolesOptions.length === 0) return null;


  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Trabajos</h3>
      <Row className="g-4">
        {rolesOptions.map((role) => {
          const isSelected = roleSelect === role;
          const rolPath = Object.values(ROLES).find((rol) => rol.value === role)?.name
          return (
            <Col xs={12} md={6} lg={4} key={role}>
              <Card
                className={`shadow-lg border-0 rounded text-center h-100 
                  ${isSelected ? "border-primary bg-light" : ""}`} // Resalta el rol seleccionado
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                  <Card.Title className="mb-3">{role}</Card.Title>
                  <Link to={`/${rolPath}`}>
                    <Button
                      variant={isSelected ? "outline-primary" : "primary"}
                      onClick={() => setRoleSelect(role)} // Cambia la selección al hacer clic
                    >
                      {isSelected ? "Seleccionado" : "Ver más"}
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default JobsList;
