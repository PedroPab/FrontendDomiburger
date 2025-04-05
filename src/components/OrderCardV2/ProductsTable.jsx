import { Table, Badge } from "react-bootstrap";
import "./ProductsTable.css";
const ProductsTable = ({ orderItems }) => {


	return (
		<Table striped bordered hover responsive className="products-table">
			<thead>
				<tr>
					{/* <th className="col-quantity">Qt</th> */}
					{/* <th className="col-name">Nombre</th> */}
					{/* <th className="col-complements">Complementos</th> */}
					{/* <th className="col-total">Total</th> */}
				</tr>
			</thead>
			<tbody>
				{orderItems?.map((item, index) => {

					const ItemsComplements = ({ complements }) => {
						if (!complements || complements.length === 0) return null;

						return complements.map((complement, index) => (
							<div key={index}>
								<Badge className="badge m-2 badge-primary">
									{complement?.quantity || 1}
								</Badge>
								<span
									style={{ backgroundColor: complement?.colorPrimary }}
									className="badge m-1">
									{complement?.name}
								</span>
							</div>
						));
					};

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
								<span>
									<ItemsComplements complements={item?.complements} />
								</span>
							</td>

							{/* <td>{formatearNumeroConPuntos(priceTotalProducts)}</td> */}
						</tr>
					)
				})}
			</tbody>
		</Table >
	);
}

export { ProductsTable };