import { Card, Table, Button } from 'react-bootstrap';
import formatearNumeroConPuntos from './../../Utils/formatearNumeroConPuntos'
import { SelectAdicionClient } from '../SelectAdicionClient';

const ResumenProductosForm = ({ listaProducto, setListaProducto }) => {
  console.log("🚀 ~ file: index.jsx:4 ~ ResumenProductosForm ~ listaProducto:", listaProducto)


  return (
    <>
      <Card.Body>
        <Card.Title style={{ fontSize: '20px' }}>RESUMEN DE PEDIDO</Card.Title>
        <div id="totalResumido">
          <Table striped>
            <thead>
              <tr>
                <th>PRODUCTOS</th>
                <th>MAS...</th>
                <th>PRECIO</th>
              </tr>
            </thead>
            <tbody>
              {
                listaProducto &&
                listaProducto.map(producto => {
                  console.log(`listaProducto`);

                  return (
                    <tr key={producto.idInter} >
                      <td ><small >{producto.name}</small></td>
                      <td><SelectAdicionClient producto={producto} /></td>
                      <td><span >{formatearNumeroConPuntos(producto.price)}</span></td>
                    </tr>)
                })
              }
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center">
          <Button variant="primary" style={{ backgroundColor: '#f89708', borderColor: '#f89708' }}>ENVIAR PEDIDO</Button>
        </div>
      </Card.Body >
    </>
  )
}

export default ResumenProductosForm