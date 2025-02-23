import { Card } from "react-bootstrap";
import CardHeaderComponent from "./CardHeader";
import CardBodyComponent from "./CardBody";
import CardFooterComponent from "./CardFooter";

function OrderCardV2() {
  // Ejemplo de datos. En la práctica, podrías recibirlos por props o desde una API.
  const comentarios = "Este usuario ha realizado varios pedidos.";
  const direccion = "Calle Falsa 123, Ciudad XYZ";
  const productos = "Pizza, Refresco";

  return (
    <Card style={{ width: "20rem" }}>
      <CardHeaderComponent
      />
      <CardBodyComponent
        comentarios={comentarios}
        direccion={direccion}
        productos={productos}
      />
      <CardFooterComponent />
    </Card>
  );
}

export  {OrderCardV2};
