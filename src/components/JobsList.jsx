import { Container, Row, Col } from "react-bootstrap";
import JobCard from "./JobCard";
import { usePreferences } from "../Context/PreferencesContext";
import { ROLES } from "../Utils/const/roles";

const JobsList = ({ rolesOptions }) => {
  const { roleSelect, setRoleSelect } = usePreferences();

  // En caso de que no haya opciones disponibles, se muestra un mensaje amigable
  if (!rolesOptions || rolesOptions.length === 0) {
    return (
      <Container className="mt-4">
        <p className="text-center">No hay trabajos disponibles actualmente.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Trabajos Disponibles</h3>
      <Row className="g-4">
        {rolesOptions.map((role) => {
          // Se extrae la información correspondiente del rol utilizando la constante ROLES
          const roleData = Object.values(ROLES).find((rol) => rol.value === role);
          if (!roleData) return null;
          const isSelected = roleSelect === role;

          return (
            <Col xs={6} md={4} lg={3} key={role}>
              <JobCard
                role={role}
                roleData={roleData}
                isSelected={isSelected}
                onSelect={setRoleSelect}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default JobsList;
