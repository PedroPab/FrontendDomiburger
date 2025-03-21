import { Alert, Container, Spinner } from "react-bootstrap";
import LayoutRecepcion from "../../../Layout/Recepcion";
import { OrdersRowsContainer } from "../../../components/Order/OrdersRowsContainer";
import { useOrdersDay } from "./hooks/useOrdersDay";
import { FormFilterOrder } from "./FormFilterOrder";
import { SummaryStatisticsOrders } from "./SummaryStatisticsOrders";

const ContabilidadV2 = () => {

	// Pedir las órdenes del día con fechas formateadas en UTCz
	const { error, data: ordenes, loading, fetchOrders } = useOrdersDay();

	return (
		<LayoutRecepcion>
			<Container fluid>
				<h1 className="text-center my-3">Contabilidad</h1>

				{/* form filter order */}
				<FormFilterOrder fetchOrders={fetchOrders} loading={loading} />

				{/* Mostrar si hay un error */}
				{error && <Alert variant="danger">{error}</Alert>}

				{/* Mostrar si está cargando */}
				{loading && <div className="text-center"><Spinner animation="border" /></div>}

				{/* Mostrar datos estadísticos */}
				<SummaryStatisticsOrders listOrders={ordenes} />
				{/* Mostrar filas de las órdenes */}
				<OrdersRowsContainer listOrders={ordenes} />
			</Container>
		</LayoutRecepcion>
	);
};

export { ContabilidadV2 };
