import { Accordion, Badge } from "react-bootstrap";
import { ProductsTable } from "./ProductsTable";
import { useWorker } from "../../Context/WorkerContext";
import { ResumedItems } from "../common/products/ResumedItems";

const ProductsInfoOrder = ({ orderItems }) => {
	const { listProducts } = useWorker();


	const { component: resumedItems, hasComplements, products } = ResumedItems(orderItems, listProducts);


	return (
		<Accordion defaultActiveKey={'0'}>
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