import { Card } from "react-bootstrap";
import CardHeaderComponent from "./CardHeader";
import CardBodyComponent from "./CardBody";
import { CardFooterComponent } from "./CardFooter";

function OrderCardV2({ data }) {

	return (
		<Card
			style={{ width: "20rem" }}
			className="mb-3"
		>
			<CardHeaderComponent
				dailyOrderNumber={data.dailyOrderNumber}
				userId={data.userId}
				clientId={data.clientId}
			/>
			<CardBodyComponent
				data={data}
			/>
			<CardFooterComponent
				data={data}
			/>
		</Card>
	);
}

export { OrderCardV2 };
