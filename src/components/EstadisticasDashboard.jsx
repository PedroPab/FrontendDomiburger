// src/components/EstadisticasDashboard.jsx
import { Row, Col } from 'react-bootstrap';
import EstadisticaCard from './EstadisticaCard.jsx';
// Importamos algunos íconos para ilustrar cada métrica
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaMobileAlt,
  FaCoins,
  FaChartLine,
  FaHamburger,
  FaGlassCheers,
  FaTruck
} from 'react-icons/fa';

const EstadisticasDashboard = ({ stats }) => {
  return (
    <Row className="g-3">
      <Col md={2}>
        <EstadisticaCard
          title="Total de ventas"
          value={`$${stats.totalDeVentas}`}
          icon={FaMoneyBillWave}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Número de ventas"
          value={stats.numeroDeVentas}
          icon={FaShoppingCart}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Ventas en efectivo"
          value={`$${stats.totalDeEfectivo}`}
          icon={FaMobileAlt}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Ventas por transferencia"
          value={`$${stats.totalDeTrasferencias}`}
          icon={FaCoins}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Total de combos"
          value={stats.totalDeCombos}
          icon={FaChartLine}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Total de hamburguesas"
          value={stats.totalDeHamburguesas}
          icon={FaHamburger}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Salsa de ajo"
          value={stats.totalDeSalsaDeAjo}
          icon={FaGlassCheers}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Domicilios"
          value={`$${stats.totalDeDomicilios}`}
          icon={FaTruck}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Costo de productos"
          value={`$${stats.TotalDeCostosProductos}`}
          icon={FaMoneyBillWave}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Gaseosas vendidas"
          value={stats.totalDeGaseosas}
          icon={FaGlassCheers}
        />
      </Col>
      <Col md={2}>
        <EstadisticaCard
          title="Costo de gaseosas"
          value={`$${stats.TotalDeCostosGaseosas}`}
          icon={FaMoneyBillWave}
        />
      </Col>
    </Row>
  );
};

export default EstadisticasDashboard;
