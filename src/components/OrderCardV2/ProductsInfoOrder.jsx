import { Accordion, Badge } from "react-bootstrap";
import { ProductsTable } from "./ProductsTable";
import { useWorker } from "../../Context/WorkerContext";
import { usePreferences } from "../../Context/PreferencesContext";
import { ROLES } from "../../Utils/const/roles";

const ProductsInfoOrder = ({ orderItems }) => {
	const { listProducts } = useWorker();
	const { roleSelect } = usePreferences();

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
		<Accordion defaultActiveKey={roleSelect === ROLES.COOK.value ? "0" : ""}>
			<Accordion.Item eventKey="0">
				<Accordion.Header
					style={{ color: "white" }}
				>
					{hasComplements && <Badge bg="danger">!!!</Badge>}	{resumedItems}
				</Accordion.Header>
				<Accordion.Body className="p-0">
					<ProductsTable orderItems={products} />
				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};

export { ProductsInfoOrder };