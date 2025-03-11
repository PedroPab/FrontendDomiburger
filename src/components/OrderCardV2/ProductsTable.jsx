import { Table, Badge } from "react-bootstrap";
import formatearNumeroConPuntos from "../../Utils/formatearNumeroConPuntos";
import "./ProductsTable.css";
const ProductsTable = ({ orderItems }) => {
	return (
		<Table striped bordered hover responsive className="products-table">
			<thead>
				<tr>
					<th className="col-quantity">Qt</th>
					<th className="col-name">Nombre</th>
					<th className="col-complements">Complementos</th>
					<th className="col-total">Total</th>
				</tr>
			</thead>
			<tbody>
				{orderItems?.map((item, index) => {
					let priceTotalProducts = item?.price * item?.quantity || 1;
					if (item?.complements?.length > 0) {
						item?.complements?.forEach(complement => {
							priceTotalProducts += complement.price * complement?.quantity || 1;
						})
					}
					return (
						<tr key={index}>
							<td>
								<Badge variant="primary" className="m-1">
									{item?.quantity || 1}
								</Badge>
							</td>
							<td>
								<span
									style={{ backgroundColor: item?.colorPrimary || "#000" }}
									className="badge m-1">
									{item?.name}
								</span>
							</td>
							<td>
								{item?.complements?.length > 0 ? (
									item?.complements.map((complement, index) => (
										<span key={index}>
											{/* quantity */}
											<Badge className=" m-1">
												{complement?.quantity || 1}
											</Badge>
											X
											{/* name */}
											<Badge
												style={{ backgroundColor: item?.colorPrimary }}
												className="badge m-1">
												{complement?.name}
											</Badge>
										</ span>
									))
								) : (
									<span className="badge m-1">-</span>
								)}
							</td>
							<td>{formatearNumeroConPuntos(priceTotalProducts)}</td>
						</tr>
					)
				})}
			</tbody>
		</Table>
	);
}

export { ProductsTable };