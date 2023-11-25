import extraerColorEstado from "../../Utils/extraeColorEstado";
import { formatTimeString } from "../../Utils/formatTime";
import formatearNumeroConPuntos from "../../Utils/formatearNumeroConPuntos";
import { ProductoBadge } from "../ProductoBadge";
const ENV = import.meta.env

const FilaPedidos = ({ pedidos }) => {
  const crearBadgeProductos = (order) => {
    // Implementa la lógica de esta función según sea necesario
    // Debería retornar un JSX o un string para el badge
    return (
      <>
        {Object.keys(order).map((key) => {
          return (
            <ProductoBadge
              key={key}
              cantidad={order[key].cantidad}
              name={order[key].name}
              colorSecondary={order[key].colorSecondary}
            />
          )
        })}
      </>
    )
  };


  return (
    <>
      {pedidos &&
        pedidos.map((element) => {
          const resumenProductos = crearBadgeProductos(element.order);
          const idRecortado = element.id.slice(0, 5);
          const tonoColorEstado = extraerColorEstado(element.estado)

          const yaPagoBadge = element?.pagoConfirmado?.confirmado
            ? <div className="badge bg-success">Si</div>
            : <div className="badge bg-danger">No</div>;

          const horaBonita = formatTimeString(element.date);

          return (
            <tr key={element.id}>
              <th scope="row">{element.numeroDeOrdenDelDia}</th>
              <td>{horaBonita}</td>
              <td>
                <div
                  style={{
                    backgroundColor: `${tonoColorEstado}`,
                    'color': 'black'
                  }}
                  className={`badge `}>{element.estado}</div>
              </td>
              <td>{element.name}</td>
              <td>{resumenProductos}</td>
              <td>{element.domiciliario_asignado?.name || 'sin asignar'}</td>
              <td>{formatearNumeroConPuntos(element.priceTotal.priceTotal)}</td>
              <td>{element.fee}</td>
              <td>{yaPagoBadge}</td>
              <td><a href={`${ENV.VITE_PROTOCOL}${ENV.VITE_HOST}:${ENV.VITE_PORT}/api/pedidos/id/?id=${element.id}`}>{idRecortado}</a></td>
            </tr>
          );
        })}
    </>
  );
};

export default FilaPedidos;
