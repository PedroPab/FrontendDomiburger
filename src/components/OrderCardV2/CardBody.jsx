import { Card } from "react-bootstrap";
import { LocationInfoOrderCard } from "./LocationInfoOrderCard";
import { ProductsInfoOrder } from "./ProductsInfoOrder";
import { CommentInfoCard } from "./CommentInfoCard";
import { PaymentInfoOrder } from "./PaymentInfoOrder";

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

			<PaymentInfoOrder data={data} />

		</Card.Body>
	);
}

export default CardBodyComponent;
