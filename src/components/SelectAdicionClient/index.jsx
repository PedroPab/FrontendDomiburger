import { Form } from "react-bootstrap"

const SelectAdicionClient = ({ producto, adiciones, onChangeSelect }) => {
  return (
    <>
      <Form.Select
        className="mw-20"
        onChange={(e) => onChangeSelect(e.target.value, producto.idInter)}
      >
        <option value="Seleccionar Adicion">Seleccionar Adicion</option>
        {
          adiciones.map(e => (
            <option key={e.id} value={e.id} >{e.name}</option>
          ))
        }
      </Form.Select >
    </>
  )
}

export { SelectAdicionClient }