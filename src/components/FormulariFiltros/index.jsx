import { Button, Form, InputGroup, Row } from "react-bootstrap"
import { RecepcionContexto } from "../../Context/RecepcionContex"
import { useContext, useState } from "react"
import { convertirFecha } from "../../Utils/formatTime"


const FormulariFiltros = ({ onBuscar }) => {
  const contextRecepcion = useContext(RecepcionContexto)
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [estado, setEstado] = useState(null);
  const [domiciliario, setDomiciliario] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar([fechaInicio, fechaFin, estado, domiciliario]);
  };


  return (<>
    <Form >
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          type="date"
          placeholder="Dia de inicio"
          value={fechaInicio}
          onChange={(e) => {
            if (e.target.value == '') return setFechaInicio(null)
            setFechaInicio({
              value: convertirFecha(e.target.value),
              key: `date`,
              type: `Date`,
              options: `>=`,
            })
          }}
        />
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          type="date"
          placeholder="Dia final"
          value={fechaFin}
          onChange={(e) => {

            if (e.target.value == '') return setFechaFin(null)
            setFechaFin({
              value: convertirFecha(e.target.value),
              key: `date`,
              type: `Date`,
              options: `<=`,
            })
          }}
        />
      </InputGroup>
      <InputGroup>
        <InputGroup.Text id="basic-addon1">Estados</InputGroup.Text>
        <Form.Select
          type="select"
          placeholder="estdados"
          onChange={(e) => {
            //si el valor es falcso no se mandar el filtor
            if (e.target.value == 'false') return setEstado(null)
            setEstado({
              value: e.target.value,
              key: `estado`,
              options: `==`
            })
          }}

        >
          <option value="false"></option>
          <option value="Calientes">Calientes</option>
          <option value="Preparando">Preparando</option>
          <option value="Despachados">Despachados</option>
          <option value="Entregados">Entregados</option>
          <option value="Facturados">Facturados</option>
          <option value="Eliminados">Eliminados</option>
          <option value="PendieteTransferencia">PendieteTransferencia</option>
        </Form.Select>
        <InputGroup.Text id="basic-addon1">Domiciliario</InputGroup.Text>
        <Form.Select
          type="select"
          placeholder=""
          onChange={(e) => {

            if (e.target.value == 'false') return setDomiciliario(null)
            setDomiciliario({
              value: e.target.value,
              key: `domiciliario_asignado.id`,
              options: `==`,
            })
          }}
        >
          <option value="false"></option>
          {
            contextRecepcion.listDomiciliarios &&
            contextRecepcion.listDomiciliarios.map(domiciliario => (
              <option
                key={domiciliario.id}
                value={domiciliario.id}>
                {domiciliario.name}
              </option>
            ))
          }
        </Form.Select>
      </InputGroup>

      <Row className="m-3">
        <Button onClick={handleSubmit} variant="warning">Enviar Filtros</Button>
      </Row>
    </Form>

  </>)
}
export default FormulariFiltros