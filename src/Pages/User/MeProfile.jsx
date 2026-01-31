import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Badge
} from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { usePreferences } from "../../Context/PreferencesContext";
import { UserLayout } from "../../Layout/UserLayout";
import { UsersService } from "../../apis/clientV2/usersService";
import PhoneInputComponent from "../../components/FormsInputs/PhoneInput";
import { FaEnvelope, FaPhone, FaPen, FaBriefcase } from "react-icons/fa";
import JobsList from "../../components/JobsList";
import photoGeneric from "../../assets/img/photoGeneric2.jpg";
import { ROLES } from "../../Utils/const/roles";

const MeProfile = () => {
  const navigate = useNavigate();
  const { usuarioActual, token } = useAuth();
  const { setRoleSelect } = usePreferences();
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

  // Redirección automática si el usuario tiene un solo rol
  useEffect(() => {
    if (rolesOptions.length === 1) {
      const singleRole = rolesOptions[0];
      const roleData = Object.values(ROLES).find((r) => r.value === singleRole);
      if (roleData) {
        setRoleSelect(singleRole);
        navigate(`/${roleData.name}`, { replace: true });
      }
    }
  }, [rolesOptions, navigate, setRoleSelect]);

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

  const handleOpenModal = () => {
    setUpdateError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setPhone(userFind.data?.phone || "");
    setUpdateError(null);
    setShowModal(false);
  };

  // Mostrar loading mientras se redirecciona (usuario con un solo rol)
  if (rolesOptions.length === 1) {
    return (
      <UserLayout>
        <Container className="py-5">
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "50vh" }}>
            <Spinner animation="border" variant="primary" className="mb-3" />
            <p className="text-muted">Redirigiendo...</p>
          </div>
        </Container>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <Container className="py-4 py-md-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            {/* Tarjeta de Perfil */}
            <Card className="shadow border-0 rounded-4 overflow-hidden">
              {/* Header con gradiente */}
              <div className="bg-primary bg-gradient p-4 pb-5 text-center">
                <h5 className="text-white mb-0 opacity-75">Mi Perfil</h5>
              </div>

              {/* Avatar y nombre */}
              <Card.Body className="text-center px-4 pb-4" style={{ marginTop: "-50px" }}>
                <Image
                  src={usuarioActual.photoURL || photoGeneric}
                  roundedCircle
                  className="border border-4 border-white shadow"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                  alt="Foto de perfil"
                />
                <h4 className="mt-3 mb-1 fw-bold">
                  {usuarioActual.displayName || "Usuario"}
                </h4>
                {rolesOptions.length > 0 && (
                  <div className="d-flex flex-wrap justify-content-center gap-2 mt-2">
                    {rolesOptions.slice(0, 3).map((role) => (
                      <Badge key={role} bg="primary" className="bg-opacity-10 text-primary fw-normal px-3 py-2">
                        {role}
                      </Badge>
                    ))}
                    {rolesOptions.length > 3 && (
                      <Badge bg="secondary" className="bg-opacity-10 text-secondary fw-normal px-3 py-2">
                        +{rolesOptions.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Información de contacto */}
                <div className="mt-4 text-start">
                  <p className="text-muted small text-uppercase fw-semibold mb-3">
                    Información de contacto
                  </p>

                  {/* Email */}
                  <div className="d-flex align-items-center p-3 bg-light rounded-3 mb-3">
                    <div className="bg-danger bg-opacity-10 rounded-3 p-2 me-3">
                      <FaEnvelope className="text-danger" />
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                      <small className="text-muted d-block">Correo electrónico</small>
                      <span className="text-truncate d-block">{usuarioActual.email}</span>
                    </div>
                  </div>

                  {/* Teléfono */}
                  {userFind.loading ? (
                    <div className="d-flex align-items-center justify-content-center p-4 bg-light rounded-3">
                      <Spinner animation="border" size="sm" className="me-2" />
                      <span className="text-muted">Cargando información...</span>
                    </div>
                  ) : userFind.error ? (
                    <Alert variant="danger" className="mb-0 rounded-3">
                      {userFind.error}
                    </Alert>
                  ) : (
                    <div className="d-flex align-items-center p-3 bg-light rounded-3">
                      <div className="bg-success bg-opacity-10 rounded-3 p-2 me-3">
                        <FaPhone className="text-success" />
                      </div>
                      <div className="flex-grow-1">
                        <small className="text-muted d-block">Teléfono</small>
                        <span className={!userFind.data?.phone ? "text-muted fst-italic" : ""}>
                          {userFind.data?.phone || "Sin registrar"}
                        </span>
                      </div>
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-3 d-flex align-items-center gap-2"
                        onClick={handleOpenModal}
                        aria-label="Editar teléfono"
                      >
                        <FaPen size={12} />
                        <span className="d-none d-sm-inline">Editar</span>
                      </Button>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Sección de Trabajos */}
            {rolesOptions.length > 0 && (
              <div className="mt-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-2">
                    <FaBriefcase className="text-primary" />
                  </div>
                  <h5 className="mb-0 fw-semibold">Mis Roles</h5>
                </div>
                <JobsList rolesOptions={rolesOptions} />
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Modal de edición del teléfono */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            <FaPhone className="text-primary me-2" />
            Editar Teléfono
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-3">
          <p className="text-muted small mb-3">
            Ingresa tu número de teléfono para que podamos contactarte.
          </p>
          <Form>
            <Form.Group>
              <PhoneInputComponent telefono={phone} setTelefono={(e) => setPhone(e)} />
            </Form.Group>
            {updateError && (
              <Alert variant="danger" className="mt-3 mb-0 rounded-3">
                {updateError}
              </Alert>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="outline-secondary"
            onClick={handleCloseModal}
            className="rounded-3 px-4"
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdatePhone}
            disabled={updating}
            className="rounded-3 px-4"
          >
            {updating ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </UserLayout>
  );
};

export { MeProfile };
