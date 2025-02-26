import { Table } from "react-bootstrap";
import formatearNumeroConPuntos from "../../Utils/formatearNumeroConPuntos";
import './ProductsTable.css'; // Import custom CSS for additional styling

const ProductsTable = ({ orderItems }) => {
	return (
		<Table striped bordered hover responsive>
			<thead>
				<tr className="m-1">
					<th>Qt</th>
					<th>Nombre</th>
					<th>Complementos</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{orderItems?.map((item, index) => (
					<tr key={index}>
						<td>
							<span className="badge custom-badge m-1">
								{item?.quantity}
							</span>
						</td>
						<td>
							<span
								style={{ backgroundColor: item?.colorPrimary }}
								className="badge custom-badge m-1">
								{item?.name}
							</span>
						</td>
						<td>
							{item?.complements?.map((complement, index) => (
								<span
									key={index}
									style={{ backgroundColor: item?.colorPrimary || "#6555" }}
									className="badge custom-badge m-1">
									{complement?.name}
								</span>
							))}
						</td>
						<td>{formatearNumeroConPuntos(item?.price)}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export { ProductsTable };