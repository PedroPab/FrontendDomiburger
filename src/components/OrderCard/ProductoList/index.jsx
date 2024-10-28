import { ListGroup } from "react-bootstrap";
import { ProductoBadge } from "../ProductoBadge";
import formatearNumeroConPuntos from "../../../Utils/formatearNumeroConPuntos";

const ProductoList = ({ productos }) => {
  return (
    <ListGroup>
      {productos.map((producto, i) => {
        const key = `${i}${producto.id}`
        let priceProductoTotal = producto.price
        return (
          <ListGroup.Item key={key} className=" d-flex justify-content-between align-items-center" >
            <span>{producto.name}{`${producto?.code ? ` - Codigo => ${producto.code}` : ''}`}</span>
            <div className=" me-auto text-center">
              {
                producto.modifique !== undefined ? producto.modifique.map((adicion, iAdicion) => {
                  const keyAdicion = `${iAdicion}${adicion.id}`
                  priceProductoTotal += adicion.price
                  return (
                    <ProductoBadge
                      key={keyAdicion}
                      name={adicion.type == 'AdicionCodigo' ? `${adicion.name}, Codigo ${adicion.code}` : adicion.name}
                      cantidad={adicion.cuanty}
                      colorSecondary={adicion.colorSecondary}
                    />
                  )
                }) : ''
              }
            </div>

            <span className="numeroPrecios" >{formatearNumeroConPuntos(priceProductoTotal)}</span>
          </ListGroup.Item >
        )
      })}
    </ListGroup >
  )
};

export { ProductoList }