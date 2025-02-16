import { Alert, Col, Row } from "react-bootstrap"
import { UserCard } from "./UserCard"

const UserList = ({ users, loading, error, handleCardClick }) => {

  return (
    <>
      <Row className="g-3 mt-4 mb-4">
        {/* Tarjeta para crear un nuevo focus */}

        {users.length === 0 ? (
          <Alert variant="warning" className="mt-4 text-center">
            No hay usuarios para mostrar
          </Alert>
        ) : (
          <>{users.map((user) => (
            <Col xs={12} sm={6} lg={4} key={user.id}>
              <UserCard user={user} />
            </Col>
          ))}
          </>
        )}
      </Row>
    </>
  )
}

export { UserList }