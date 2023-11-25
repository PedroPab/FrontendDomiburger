import { Table } from 'react-bootstrap';
import FilaPedidos from "../FilaPedido";


const TablaListaPedidos = ({ pedidos }) => {
  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          {/* Encabezados de la tabla */}
          <tr>
            <th scope="col">#</th>
            <th scope="col">Hora</th>
            <th scope="col">Estado</th>
            <th scope="col">Nombre</th>
            <th scope="col">Productos</th>
            <th scope="col">Domiciliario</th>
            <th scope="col">Total</th>
            <th scope="col">Type</th>
            <th scope="col">$?</th>
            <th scope="col">Mas...</th>
          </tr>
        </thead>
        <tbody>
          <FilaPedidos
            pedidos={pedidos}
          />
        </tbody>
      </Table>
    </div>
  );
};

export default TablaListaPedidos;
