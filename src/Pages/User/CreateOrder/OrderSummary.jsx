import { Button, Container, Card, ListGroup, Row, Col, Alert } from "react-bootstrap";
import { NavigationButtons } from "./NavigationButtons";
import { useAuth } from "../../../Context/AuthContext";
import { LocationCardReduce } from "../../../components/Locations/LocationCardReduce";

const OrderSummary = ({ onPrev, location, productOrderList = [], comment, paymentMethod }) => {
  const { usuarioActual } = useAuth();

  // Calcular el precio total sumando los precios de los productos
  const totalPrice = productOrderList.reduce((sum, product) => sum + (product.price || 0), 0);

  return (
    <Container>
      <h2 className="fw-bold mt-3 mb-4 text-center">Resumen del Pedido</h2>

      {/* Ubicación */}
      <Card className="mb-3">
        <Card.Header className="fw-bold">Ubicación de Entrega</Card.Header>
        <Card.Body>
          {location ? <LocationCardReduce location={location} /> : <Alert variant="warning">No se ha seleccionado una ubicación.</Alert>}
        </Card.Body>
      </Card>

      {/* Datos del usuario */}
      <Card className="mb-3">
        <Card.Header className="fw-bold">Datos del Cliente</Card.Header>
        <Card.Body>
          <p><strong>Nombre:</strong> {usuarioActual?.displayName || "Nombre no disponible"}</p>
          <p><strong>Teléfono:</strong> {usuarioActual?.phoneNumber || "Teléfono no disponible"}</p>
        </Card.Body>
      </Card>

      {/* Comentario y método de pago */}
      <Card className="mb-3">
        <Card.Header className="fw-bold">Detalles del Pedido</Card.Header>
        <Card.Body>
          <p><strong>Comentario:</strong> {comment || "Sin comentarios"}</p>
          <p><strong>Método de pago:</strong> {paymentMethod || "No seleccionado"}</p>
        </Card.Body>
      </Card>

      {/* Lista de productos */}
      <Card className="mb-3">
        <Card.Header className="fw-bold">Productos en el Pedido</Card.Header>
        <ListGroup variant="flush">
          {productOrderList.length > 0 ? (
            productOrderList.map((product, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col xs={8}><strong>{product.name}</strong></Col>
                  <Col xs={4} className="text-end">${product.price?.toFixed(2) || "0.00"}</Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>
              <Alert variant="warning" className="mb-0">No hay productos en el pedido.</Alert>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      {/* Total del pedido */}
      <Card className="mb-3">
        <Card.Header className="fw-bold">Total a Pagar</Card.Header>
        <Card.Body className="text-end fs-4 fw-bold">${totalPrice.toFixed(2)}</Card.Body>
      </Card>

      {/* Botón de comprar */}
      <div className="text-center mb-4">
        <Button variant="primary" size="lg" disabled={productOrderList.length === 0}>
          Comprar
        </Button>
      </div>

      <div className="p-3"></div>

      {/* Botones de navegación */}
      <NavigationButtons onPrev={onPrev} disabled={false} />
    </Container>
  );
};

export { OrderSummary };
