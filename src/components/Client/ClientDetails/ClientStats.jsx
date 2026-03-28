import { Row, Col, Card } from 'react-bootstrap';
import { FaShoppingCart, FaDollarSign, FaCalendarCheck, FaStar } from 'react-icons/fa';

const ClientStats = ({ orders = [] }) => {
  const totalPedidos = orders.length;

  const totalGastado = orders.reduce((sum, order) => {
    return sum + (order.total || order.totalPedido || 0);
  }, 0);

  const pedidosEntregados = orders.filter(
    order => order.estado === 'Entregados' || order.estado === 'Facturados'
  ).length;

  const ultimoPedido = orders.length > 0
    ? orders.reduce((latest, order) => {
        const orderDate = order.date?._seconds || order.dateCreate?._seconds || 0;
        const latestDate = latest.date?._seconds || latest.dateCreate?._seconds || 0;
        return orderDate > latestDate ? order : latest;
      }, orders[0])
    : null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value || 0);
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return 'Sin pedidos';
    let date;
    if (dateObj._seconds) {
      date = new Date(dateObj._seconds * 1000);
    } else if (typeof dateObj === 'string') {
      date = new Date(dateObj);
    } else {
      return 'Sin pedidos';
    }
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const stats = [
    {
      title: 'Total Pedidos',
      value: totalPedidos,
      icon: <FaShoppingCart size={24} />,
      color: 'primary',
      bgColor: '#e3f2fd'
    },
    {
      title: 'Total Gastado',
      value: formatCurrency(totalGastado),
      icon: <FaDollarSign size={24} />,
      color: 'success',
      bgColor: '#e8f5e9'
    },
    {
      title: 'Pedidos Completados',
      value: pedidosEntregados,
      icon: <FaStar size={24} />,
      color: 'warning',
      bgColor: '#fff8e1'
    },
    {
      title: 'Ultimo Pedido',
      value: formatDate(ultimoPedido?.date || ultimoPedido?.dateCreate),
      icon: <FaCalendarCheck size={24} />,
      color: 'info',
      bgColor: '#e0f7fa'
    }
  ];

  return (
    <Row className="g-3 mb-4">
      {stats.map((stat, index) => (
        <Col xs={6} md={3} key={index}>
          <Card
            className="h-100 border-0 shadow-sm"
            style={{ backgroundColor: stat.bgColor }}
          >
            <Card.Body className="d-flex flex-column align-items-center text-center py-3">
              <div className={`text-${stat.color} mb-2`}>
                {stat.icon}
              </div>
              <h4 className={`mb-1 text-${stat.color} fw-bold`}>
                {stat.value}
              </h4>
              <small className="text-muted">{stat.title}</small>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export { ClientStats };
