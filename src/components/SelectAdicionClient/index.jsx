import { Form } from "react-bootstrap"


const SelectAdicionClient = ({ producto }) => {

  return (
    <>
      <Form.Select
        id="metodoDePagoInput"
        required
      // value={}
      // onChange={(e) => setMetodoDePago(e.target.value)}
      >
        <option value="Efectivo">Efectivo</option>
        <option value="Transferencia">Transferencia</option>
      </Form.Select>
    </>
  )
}

export { SelectAdicionClient }