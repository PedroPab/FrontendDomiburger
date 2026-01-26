import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
  Modal,
  Spinner,
  Alert,
  ListGroup
} from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { UserLayout } from "../../Layout/UserLayout";
import { UsersService } from "../../apis/clientV2/usersService";
import PhoneInputComponent from "../../components/FormsInputs/PhoneInput";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import JobsList from "../../components/JobsList";
import photoGeneric from "../../assets/img/photoGeneric2.jpg";

const MeProfile = () => {
  const { usuarioActual, token } = useAuth();
  const usersService = new UsersService(token);

  const rolesOptions = usuarioActual?.roles || [];

  const [userFind, setUserFind] = useState({
    loading: true,
    data: null,
    error: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await usersService.me();
        const userData = response
        setUserFind({ loading: false, data: userData, error: null });
        setPhone(userData.phone || "");
      } catch (error) {
        setUserFind({ loading: false, data: null, error: error.message });
      }
    };

    setUserFind({ loading: true, data: null, error: null });
    fetchUserData();
  }, []);

  const handleUpdatePhone = async () => {
    setUpdating(true);
    setUpdateError(null);
    try {
      await usersService.updatePhone(phone);
      setUserFind((prev) => ({
        ...prev,
        data: { ...prev.data, phone },
      }));
      setShowModal(false);
    } catch (error) {
      setUpdateError("No se pudo actualizar el teléfono. Intenta nuevamente.");
    }
    setUpdating(false);
  };

  return (
    <UserLayout>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded text-center">
              <Card.Body>
                <div className="d-flex flex-column align-items-center">
                  <Image
                    src={usuarioActual.photoURL || photoGeneric}
                    roundedCircle
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "4px solid #007bff",
                    }}
                    alt="Foto de perfil"
                  />
                  <h4 className="mt-3">
                    <FaUser className="me-2 text-primary" />
                    {usuarioActual.displayName || "Usuario Anónimo"}
                  </h4>
                </div>

                <ListGroup variant="flush" className="mt-3 text-start">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaEnvelope className="text-secondary me-2" />
                    <strong>Email:</strong>
                    <span className="ms-auto">{usuarioActual.email}</span>
                  </ListGroup.Item>

                  {userFind.loading ? (
                    <ListGroup.Item className="text-center">
                      <Spinner animation="border" />
                    </ListGroup.Item>
                  ) : userFind.error ? (
                    <ListGroup.Item className="text-center">
                      <Alert variant="danger">{userFind.error}</Alert>
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item className="d-flex align-items-center">
                      <FaPhone className="text-success me-2" />
                      <strong>Teléfono:</strong>
                      <span className="ms-auto">{userFind.data?.phone || "No disponible"}</span>
                      <Button
                        variant="outline-primary"
                        className="ms-2 btn-sm"
                        onClick={() => setShowModal(true)}
                      >
                        Editar
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          {
            rolesOptions &&
            <JobsList rolesOptions={rolesOptions} />
          }
        </Row>
      </Container>

      {/* Modal de edición del teléfono */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Teléfono</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <PhoneInputComponent telefono={phone} setTelefono={(e) => setPhone(e)} />
            </Form.Group>
            {updateError && <Alert variant="danger">{updateError}</Alert>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdatePhone} disabled={updating}>
            {updating ? <Spinner animation="border" size="sm" /> : "Guardar Cambios"}
          </Button>
        </Modal.Footer>
      </Modal>
    </UserLayout>
  );
};

export { MeProfile };
