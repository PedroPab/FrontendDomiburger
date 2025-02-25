import { Card } from "react-bootstrap";
import CardHeaderComponent from "./CardHeader";
import CardBodyComponent from "./CardBody";
import { CardFooterComponent } from "./CardFooter";

function OrderCardV2({ data }) {

  return (
    <Card style={{ width: "20rem" }}>
      <CardHeaderComponent
        dailyOrderNumber={data.dailyOrderNumber}
        userClientId={data.userClientId}
      />
      <CardBodyComponent
      />
      <CardFooterComponent
        data={data}
      />
    </Card>
  );
}

export { OrderCardV2 };
