import { ListGroup } from "react-bootstrap";
import formatearNumeroConPuntos from "../../Utils/formatearNumeroConPuntos";
import { ImCheckmark } from "react-icons/im";
import { GiCancel } from "react-icons/gi";



const Total = ({ totalPrecio, fee, yaPago }) => {
  const PagadoIcon = (yaPago) => {
    if (yaPago) return (<ImCheckmark />)
    else return (<GiCancel />)
  }
  return (
    <>
      {
        fee == `Transferencia` ?

          (<div className="text-decoration-line-through">{formatearNumeroConPuntos(totalPrecio)}<PagadoIcon yaPago={yaPago} /></div>) :
          (<div>{formatearNumeroConPuntos(totalPrecio)}</div>)
      }
    </>
  )
}

const TotalPrecio = ({ totalPrecio, fee, yaPago }) => {
  return (
    <>
      <ListGroup>
        <ListGroup.Item className="ist-group-item d-flex flex-wrap justify-content-between align-items-center">
          <span>Total</span>
          <span>{fee}</span>
          <span>
            <Total
              totalPrecio={totalPrecio}
              fee={fee}
              yaPago={yaPago}
            /></span>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

export { TotalPrecio }