import { Accordion, Badge } from "react-bootstrap";
import { ProductsTable } from "./ProductsTable";
import { useWorker } from "../../Context/WorkerContext";

const ProductsInfoOrder = ({ orderItems }) => {
	console.log("🚀 ~ ProductsInfoOrder ~ orderItems:", orderItems);
	const { listProducts } = useWorker();

	const products = orderItems.map((item) => {
		// Buscar el producto en la lista de productos
		const product = listProducts.find((product) => product.id === item.id);

		if (item.complements) {
			item.complements = item.complements.map((complement) => {
				const complementProduct = listProducts.find((product) => product.id === complement.id);
				return {
					...complement,
					...complementProduct
				};
			});
		} else {
			item.complements = [];
		}

		return {
			...item,
			...product
		};
	});

	// Separar los productos para los distintos tipos de productos que hay y su cantidad, para mostrar un solo string de los productos
	const listResumed = new Map();
	products.map((item) => {
		const product = listResumed.get(item.id);
		if (product) {
			product.quantity += item?.quantity || 1;
		} else {
			listResumed.set(item.id, { ...item, quantity: item?.quantity || 1 });
		}
	});

	const resumedItems = Array.from(listResumed.values()).map((item) => {
		return (
			<span key={item.id} className="badge m-1" style={{ backgroundColor: item?.colorPrimary }}>
				{item.quantity} {item.name}
			</span>
		);
	});

	const hasComplements = products.some((item) => item.complements.length > 0);

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header
					// cambiar le color del alert dependiendo si hay complementos
					bg={hasComplements ? "danger" : "success"}
				>
					{resumedItems}
				</Accordion.Header>
				<Accordion.Body>
					<ProductsTable orderItems={products} />
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export { ProductsInfoOrder };