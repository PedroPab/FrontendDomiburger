import { FaCartPlus } from "react-icons/fa"
import DashboardProducts from "../../../components/Products/Dashboard/Dashboard"
import { useState } from "react";

const ProductSelectionStep = ({ onNext, productOrderList, setProductOrderList }) => {

  const [dataDomicilio, setDataDomicilio] = useState({});
  const [precioDeliveryManual, setPrecioDeliveryManual] = useState(null);

  return (
    <>
      <div className="container">

        <div className="">

          <DashboardProducts
            listaProductosOrder={productOrderList}
            setListaProductosOrder={setProductOrderList}
            dataDomicilio={dataDomicilio}
            setDataDomicilio={setDataDomicilio}
            precioDeliveryManual={precioDeliveryManual}
            setPrecioDeliveryManual={setPrecioDeliveryManual}
          />

        </div>
        <button className="btn btn-primary mt-4 w-100 mb-4" onClick={onNext}>
          Siguiente
        </button>
      </div>
    </>
  )
}

export { ProductSelectionStep }