import { Accordion } from "react-bootstrap";
import { ProductsTable } from "./ProductsTable";
import { useRecepcion } from "../../Context/RecepcionContex";

const ProductsInfoOrder = ({ orderItems }) => {
	const { listProducts } = useRecepcion()
	//separamos los productos para ver su informacion de forma resumida
	const groupedItems = orderItems?.reduce((acc, item) => {
		if (!acc[item.id]) {
			acc[item.id] = { ...item, quantity: 0 };
		}
		acc[item.id].quantity += item.quantity;
		return acc;
	}, {});

	const summarizedItems = Object.values(groupedItems);

	const products = orderItems.map((item) => {
		const product = listProducts.find((product) => product.id === item.id);
		if (item.complements) {
			item.complements = item.complements.map((complement) => {
				const complementProduct = listProducts.find((product) => product.id === complement.id);
				return {
					...complement,
					...complementProduct
				}
			})
		}
		return {
			...item,
			...product
		}
	})

	return (
		<Accordion>
			<Accordion.Item eventKey="0">
				<Accordion.Header>
					{summarizedItems?.length} {summarizedItems?.length > 1 ? "Products" : "Product"}

				</Accordion.Header>
				<Accordion.Body>

					<ProductsTable orderItems={products} />

				</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
}

export { ProductsInfoOrder };