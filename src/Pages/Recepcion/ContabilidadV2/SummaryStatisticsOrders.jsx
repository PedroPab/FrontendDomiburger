import { useMemo } from "react";
import { Card, ListGroup, Container, Row, Col, Accordion, Table, Image, Badge } from "react-bootstrap";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaBoxOpen,
  FaTruck,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useRecepcion } from "../../../Context/RecepcionContex";
import { calculateStatistics } from "./calculateStatistics";
import { ORDER_STATUSES } from "../../../Utils/const/status";
import { NameAndPhoto } from "../../../components/common/users/NameAndPhoto";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card className="shadow-sm h-100 border-0" style={{ borderTop: `4px solid ${color}` }}>
    <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
      <div
        className="rounded-circle d-flex align-items-center justify-content-center mb-3"
        style={{ width: 56, height: 56, backgroundColor: `${color}20` }}
      >
        <Icon size={24} style={{ color }} />
      </div>
      <div className="text-muted small mb-1">{title}</div>
      <div className="fw-bold fs-3">{value}</div>
    </Card.Body>
  </Card>
);

const SummaryStatisticsOrders = ({ listOrders }) => {
  const stats = useMemo(() => calculateStatistics(listOrders), [listOrders]);
  const totalInvoicedOrders = listOrders.filter(
    (order) => order.status === ORDER_STATUSES.INVOICED
  ).length;
  const { listDomiciliarios, listProducts } = useRecepcion();

  if (!listOrders.length) return null;

  return (
    <Container className="my-4">
      <h5 className="fw-bold mb-1">Resumen estadístico</h5>
      <p className="text-muted small mb-3">
        <FaExclamationTriangle className="me-1 text-warning" />
        Las estadísticas consideran únicamente pedidos en estado <strong>facturado</strong>.
        {stats.totalSalesNotCounted > 0 && (
          <Badge bg="warning" text="dark" className="ms-2">
            {stats.totalSalesNotCounted} sin facturar
          </Badge>
        )}
      </p>

      <Row className="g-3 mb-4">
        <Col xs={12} sm={4}>
          <StatCard
            icon={FaFileInvoiceDollar}
            title="Órdenes facturadas"
            value={totalInvoicedOrders}
            color="#0d6efd"
          />
        </Col>
        <Col xs={12} sm={4}>
          <StatCard
            icon={FaMoneyBillWave}
            title="Ventas totales"
            value={`$${stats.totalSales.toLocaleString()}`}
            color="#198754"
          />
        </Col>
        <Col xs={12} sm={4}>
          <StatCard
            icon={FaShoppingCart}
            title="Productos vendidos"
            value={stats.totalProductsSold}
            color="#fd7e14"
          />
        </Col>
      </Row>

      <Accordion defaultActiveKey="0" alwaysOpen={false}>
        {/* Ventas por método de pago */}
        <Accordion.Item eventKey="0" className="mb-2 border rounded">
          <Accordion.Header>
            <FaCreditCard className="me-2 text-primary" />
            <span className="fw-semibold">Ventas por método de pago</span>
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-2 px-3">
                <span className="text-muted small">Total de registros en el período</span>
                <Badge bg="secondary">{listOrders.length}</Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center py-2 px-3">
                <span className="text-muted small">Total facturado</span>
                <strong className="text-success">${stats.totalSales.toLocaleString()}</strong>
              </ListGroup.Item>
            </ListGroup>
            {Object.keys(stats.salesByPaymentMethod).length > 0 && (
              <div className="px-3 pb-3">
                <Table bordered hover size="sm" className="mb-0 mt-2">
                  <thead className="table-light">
                    <tr>
                      <th>Método</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(stats.salesByPaymentMethod).map(([method, orders]) => (
                      <tr key={method}>
                        <td className="text-capitalize">{method}</td>
                        <td className="text-center">{orders.length}</td>
                        <td className="text-end">
                          ${orders
                            .reduce((acc, order) => acc + order.totalPrice, 0)
                            .toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>

        {/* Productos */}
        <Accordion.Item eventKey="1" className="mb-2 border rounded">
          <Accordion.Header>
            <FaBoxOpen className="me-2 text-warning" />
            <span className="fw-semibold">Detalle de productos</span>
          </Accordion.Header>
          <Accordion.Body className="p-0">
            <div className="px-3 pb-3 pt-2">
              <Table bordered hover size="sm" className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Total ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats.productsCount).map(([productId, data]) => {
                    const product =
                      listProducts.find((p) => p.id === productId) || {};
                    return (
                      <tr key={productId}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {product?.photoUrl && (
                              <Image
                                src={product.photoUrl}
                                style={{ width: 32, height: 32, objectFit: "cover" }}
                                roundedCircle
                              />
                            )}
                            <span>{product.name || productId}</span>
                          </div>
                        </td>
                        <td className="text-center">{data.quantity}</td>
                        <td className="text-end">${data.totalSales.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Accordion.Body>
        </Accordion.Item>

        {/* Domicilios */}
        {stats.deliveryCount > 0 && (
          <Accordion.Item eventKey="2" className="mb-2 border rounded">
            <Accordion.Header>
              <FaTruck className="me-2 text-success" />
              <span className="fw-semibold">Domicilios</span>
              <Badge bg="success" className="ms-2">
                {stats.deliveryCount}
              </Badge>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between py-2 px-3">
                  <span className="text-muted small">Total ventas con domicilio</span>
                  <strong>${stats.totalDeliverySales.toLocaleString()}</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between py-2 px-3">
                  <span className="text-muted small">Total costo de domicilios</span>
                  <strong>${stats.totalDeliveryCost.toLocaleString()}</strong>
                </ListGroup.Item>
              </ListGroup>
              {Object.keys(stats.salesByDelivery).length > 0 && (
                <div className="px-3 pb-3">
                  <Table bordered hover size="sm" className="mb-0 mt-2">
                    <thead className="table-light">
                      <tr>
                        <th>Domiciliario</th>
                        <th className="text-center">Pedidos</th>
                        <th className="text-end">Total cobrado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(stats.salesByDelivery).map(([deliveryId, data]) => {
                        const courier =
                          listDomiciliarios.find((d) => d.id === deliveryId) || {};
                        return (
                          <tr key={deliveryId}>
                            <td>
                              <NameAndPhoto
                                name={courier?.name}
                                photo={courier?.photoUrl}
                              />
                            </td>
                            <td className="text-center">{data.quantity}</td>
                            <td className="text-end">${data.totalSales.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
    </Container>
  );
};

export { SummaryStatisticsOrders };
