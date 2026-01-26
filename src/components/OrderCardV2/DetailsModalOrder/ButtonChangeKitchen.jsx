import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { SelectKitchen } from "../../FormsInputs/SelectKitchen";
import { useChangeKitchen } from "../../../hooks/api/changeKitchen";
import { toast } from "react-toastify";

const ButtonChangeKitchen = ({ id, changeSucceed }) => {
  const [kitchenIdSelect, setKitchenIdSelect] = useState(null);

  const { changeKitchen, loading, error, data } = useChangeKitchen()

  useEffect(() => {
    if (data) {
      changeSucceed();
    }
  }, [data])

  useEffect(() => {
    if (error) {
      toast.error(`Error al cambiar la cocina: ${error?.message}`);
    }
  }, [error])

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h5">Cambiar Cocina</Card.Header>
            <Card.Body>
              <SelectKitchen
                kitchenIdSelect={kitchenIdSelect}
                setKitchenIdSelect={setKitchenIdSelect}
              />

              {/* Alerta de error */}
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error?.message}
                </Alert>
              )}

              <Button
                variant="primary"
                onClick={() => changeKitchen(id, kitchenIdSelect)}
                disabled={loading || data}
                className="mt-3 w-100"
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : data ? (
                  "Cambiado"
                ) : (
                  "Cambiar Cocina"
                )}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export { ButtonChangeKitchen };