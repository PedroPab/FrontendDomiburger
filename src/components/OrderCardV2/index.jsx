import { Card } from "react-bootstrap";
import CardHeaderComponent from "./CardHeader";
import CardBodyComponent from "./CardBody";
import { CardFooterComponent } from "./CardFooter";
import { StatusName } from "./StatusName";

function OrderCardV2({ data }) {

  return (
    <Card
      style={{ width: "20rem" }}
      className="mb-3"
    >
      <CardHeaderComponent
        order={data}
      />
      <CardBodyComponent
        data={data}
      />
      <CardFooterComponent
        data={data}
      />
      <StatusName order={data} />
    </Card>
  );
}

export { OrderCardV2 };
