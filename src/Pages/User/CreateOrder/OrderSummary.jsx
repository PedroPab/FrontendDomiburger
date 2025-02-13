import { Button, Container, Card, ListGroup, Row, Col, Alert, Spinner } from "react-bootstrap";
import { NavigationButtons } from "./NavigationButtons";
import { useAuth } from "../../../Context/AuthContext";
import { LocationCardReduce } from "../../../components/Locations/LocationCardReduce";
import { useEffect, useMemo, useState } from "react";
import { KitchenService } from "../../../apis/clientV2/KitchenService";

const OrderSummary = ({ onPrev, location, productOrderList = [], comment, paymentMethod }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [kitchen, setKitchen] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuarioActual, token } = useAuth();
  const kitchenService = useMemo(() => new KitchenService(token), [token]);

  // Calcular el precio total sumando los precios de los productos
  useEffect(() => {
    let total = productOrderList.reduce((sum, product) => sum + (product.price || 0), 0);
    if (delivery) {
      total += delivery.price
    }
    setTotalPrice(total);
  }, [productOrderList, delivery]);


  useEffect(() => {
    const calculateDistance = async () => {
      setLoading(true);
      setError(null);
      try {
        const rta = await kitchenService.getSelectKitchen(location.id);
        console.log(`[ ~ calculateDistance ~ rta]`, rta);
        setKitchen(rta.data.body?.kitchen || null);
        setDelivery(rta.data.body?.delivery || null);
      } catch (err) {
        console.error("Error obteniendo la cocina y distancia:", err);
        setError("Error obteniendo la información de la cocina.");
      } finally {
        setLoading(false);
      }
    };

    if (location?.id) {
      calculateDistance();
    }
  }, [location, kitchenService]);

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

      {/* Información de la cocina y distancia */}
      <Card className="mb-3">
        <Card.Header className="fw-bold">Detalles de Envío</Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Calculando distancia...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : kitchen ? (
            <>
              <p><strong>Cocina Asignada:</strong> {kitchen.name || "No disponible"}</p>
              <p><strong>Distancia:</strong> {(delivery?.distance / 1000 || 0) || "No disponible"} km</p>
              <p><strong>Tiempo Estimado:</strong> {delivery?.duration || "No disponible"} min</p>
              <p><strong>Costo de Envío:</strong> ${delivery?.price?.toFixed(2) || "0.00"}</p>
            </>
          ) : (
            <Alert variant="warning">No se pudo encontrar una cocina cercana.</Alert>
          )}
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
        <Card.Body className="text-end fs-4 fw-bold">
          ${totalPrice.toFixed(2)}
        </Card.Body>
      </Card>

      {/* Botón de comprar */}
      <div className="text-center mb-4">
        <Button variant="primary" size="lg" disabled={productOrderList.length === 0 || loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Calculando...
            </>
          ) : (
            "Comprar"
          )}
        </Button>
      </div>

      <div className="p-3"></div>

      {/* Botones de navegación */}
      <NavigationButtons onPrev={onPrev} disabled={loading} />
    </Container>
  );
};

export { OrderSummary };
