import { Card, Table } from 'react-bootstrap';
import ProductoRow from './../../components/Products/ProductoRow';
import useAdiciones from './useAdiciones';
import useProductosModificaciones from './useProductosModificaciones';
import DeliveryRow from './DeliveryRow';

const ResumenProductosForm = ({ listaProducto, setListaProducto, delivery }) => {
	const adiciones = useAdiciones();

	const { onChangeSelectAdicion, onClicAdicion, calcularTotalProductos } =
		useProductosModificaciones(listaProducto, setListaProducto, adiciones);

	// Suma el total de productos y delivery
	const totalPedido = () => {
		let total = calcularTotalProductos();
		if (delivery && delivery.price) {
			total += delivery.price;
		}
		return total;
	};

	return (
		<Card >
			<Card.Body>
				<Card.Title className="mb-4 text-center">Resumen de Pedido</Card.Title>
				<p className="text-muted text-center">Detalle de los productos, adiciones y sus precios</p>
				<div id="totalResumido">
					<Table striped bordered hover responsive className="table-sm">
						<thead className="thead-dark">
							<tr>
								<th>Productos</th>
								<th>Adiciones</th>
								<th>Precio</th>
							</tr>
						</thead>
						<tbody>
							{listaProducto && listaProducto.map((producto, index) => (
								<ProductoRow
									key={producto.idInter || index}
									producto={producto}
									adiciones={adiciones}
									setListaProducto={setListaProducto}
									onChangeSelectAdicion={onChangeSelectAdicion}
									onClicAdicion={onClicAdicion}
								/>
							))}
							<DeliveryRow delivery={delivery} />
						</tbody>
						<tfoot>
							<tr>
								<th colSpan="2" className="text-right">Total</th>
								<th className="text-success">${totalPedido().toLocaleString()}</th>
							</tr>
						</tfoot>
					</Table>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ResumenProductosForm;
