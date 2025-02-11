import { useContext, useEffect, useState } from "react";
import { RecepcionContexto } from "../../../Context/RecepcionContex";
import ListMarker from "../../../components/ListMarker";

const ListOrder = ({ items }) => {
  //miramos los cambios de domiciliarioIdFilter del contexto
  const { domiciliarioIdFilter } = useContext(RecepcionContexto)
  const [filteredPedidos, setFilteredPedidos] = useState(items)

  useEffect(() => {
    // si es un id valido filtramos los pedidos que tengan ese domiciliario
    if (domiciliarioIdFilter === 'ninguno') {
      setFilteredPedidos(items.filter(pedido => !pedido?.domiciliario_asignado))
    } else if (domiciliarioIdFilter) {
      setFilteredPedidos(items.filter(pedido => pedido?.domiciliario_asignado?.id === domiciliarioIdFilter))
    } else {
      setFilteredPedidos(items)
    }
  }, [domiciliarioIdFilter, items])

  return (
    <>
      {
        filteredPedidos ? (<ListMarker
          pedidos={filteredPedidos}
        />) : (<></>)
      }</>
  );
}

export default ListOrder;