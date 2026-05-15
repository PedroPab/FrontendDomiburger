import { Alert, Container, Spinner } from "react-bootstrap";
import { FaChartBar } from "react-icons/fa";
import LayoutRecepcion from "../../../Layout/Recepcion";
import { OrdersRowsContainer } from "../../../components/Order/OrdersRowsContainer";
import { useOrdersDay } from "./hooks/useOrdersDay";
import { FormFilterOrder } from "./FormFilterOrder";
import { SummaryStatisticsOrders } from "./SummaryStatisticsOrders";

const ContabilidadV2 = () => {
  const { error, data: ordenes, loading, fetchOrders } = useOrdersDay();

  return (
    <LayoutRecepcion>
      <Container fluid className="py-3 px-3 px-md-4">
        {/* Encabezado */}
        <div className="d-flex align-items-center gap-2 mb-4">
          <FaChartBar size={24} className="text-primary" />
          <div>
            <h4 className="mb-0 fw-bold">Contabilidad</h4>
            <p className="mb-0 text-muted small">Consulta y análisis de pedidos por período</p>
          </div>
        </div>

        {/* Filtro de fechas */}
        <FormFilterOrder fetchOrders={fetchOrders} loading={loading} />

        {/* Error */}
        {error && (
          <Alert variant="danger" className="d-flex align-items-center gap-2">
            <strong>Error:</strong> {error}
          </Alert>
        )}

        {/* Cargando */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="text-muted mt-2 small">Cargando pedidos...</p>
          </div>
        )}

        {/* Contenido */}
        {!loading && (
          <>
            <SummaryStatisticsOrders listOrders={ordenes} />
            <hr className="my-3" />
            <OrdersRowsContainer listOrders={ordenes} />
          </>
        )}
      </Container>
    </LayoutRecepcion>
  );
};

export { ContabilidadV2 };
