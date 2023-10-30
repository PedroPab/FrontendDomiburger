import { ListGroup } from "react-bootstrap";

const Total = ({ totalPrecio, fee }) => (
  <>
    {
      fee == `Transferencia` ? (<div className="text-decoration-line-through">{totalPrecio}</div>) : (<div>{totalPrecio}</div>)
    }
  </>
)

const TotalPrecio = ({ listProductos, totalPrecio, fee }) => {
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
            /></span>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

export { TotalPrecio }