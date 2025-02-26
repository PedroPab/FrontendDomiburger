import { Card } from "react-bootstrap";
import { LocationInfoOrderCard } from "./LocationInfoOrderCard";
import { ProductsInfoOrder } from "./ProductsInfoOrder";
import { CommentInfoCard } from "./CommentInfoCard";

function CardBodyComponent({ data }) {
	console.log("🚀 ~ CardBodyComponent ~ data:", data)
	const orderItems = data?.orderItems;
	console.log("🚀 ~ CardBodyComponent ~ orderItems:", orderItems)
	const comment = data?.comment;
	const locationId = data?.locationId;

	return (
		<Card.Body>
			{/* comentario del ciente */}
			<CommentInfoCard comment={comment} />

			<LocationInfoOrderCard locationId={locationId} />

			<ProductsInfoOrder orderItems={orderItems} />

		</Card.Body>
	);
}

export default CardBodyComponent;
