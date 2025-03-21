import DashboardProducts from "../../../components/Products/Dashboard/Dashboard"
import { useState } from "react";
import { Container } from "react-bootstrap";
import { NavigationButtons } from "./NavigationButtons";

const ProductSelectionStep = ({ onNext, productOrderList, setProductOrderList }) => {

  const [dataDomicilio, setDataDomicilio] = useState({});
  const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);

  return (
    <>
      <Container>

        <DashboardProducts
          listaProductosOrder={productOrderList}
          setListaProductosOrder={setProductOrderList}
          dataDomicilio={dataDomicilio}
          setDataDomicilio={setDataDomicilio}
          precioDeliveryManual={precioDeliveryManual}
          setPrecioDeliveryManual={setPrecioDeliveryManual}
        />

        <div className="my-5"></div>
        <div className="p-4"></div>

        <NavigationButtons onNext={onNext} disabled={false} />

      </Container>
    </>
  )
}

export { ProductSelectionStep }