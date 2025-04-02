import { Table } from "react-bootstrap";
import { OrderRow } from "./OrderRow";
import { FaRegSadCry } from "react-icons/fa";

const OrdersRowsContainer = ({ listOrders }) => {
	return listOrders && listOrders.length > 0 ? (
		<Table responsive striped bordered hover>
			<thead>
				<tr>
					<th># Orden</th>
					<th>Fecha</th>
					<th>Estado</th>
					<th>Cliente</th>
					<th>Domiciliario</th>
					<th>Productos</th>
					<th>Total</th>
					<th>Método de Pago</th>
					<th>Estado de Pago</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{listOrders.map((order, index) => (
					<OrderRow key={index} order={order} />
				))}
			</tbody>
		</Table>
	) : (
		<div className="text-center mt-4">
			<FaRegSadCry size={50} />
			<p>Sin órdenes</p>
		</div>
	);
};

export { OrdersRowsContainer };
