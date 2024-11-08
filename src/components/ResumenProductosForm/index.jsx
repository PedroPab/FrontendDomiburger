import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import ProductoRow from './../../components/ProductoRow'; // Nuevo componente
import { UtilsApi } from './../../Utils/utilsApi';
import formatearNumeroConPuntos from '../../Utils/formatearNumeroConPuntos';
import { Adiciones } from '../../Utils/classProduct';

const ResumenProductosForm = ({ listaProducto, setListaProducto, domicilio, addressPrice }) => {
  const [dataDomicilio, setDataDomicilio] = domicilio
  const [precioDeliveryManual, setPrecioDeliveryManual] = addressPrice
  const [adiciones, setAdiciones] = useState([]);

  useEffect(() => {
    UtilsApi({ peticion: 'productos/filter?key=type&options===&value=Adicion', vervo: 'GET' })
      .then(data => data.map(e => e.data))
      .then(data => setAdiciones(data))
      .catch(error => console.log(error));
  }, []);

  const onChangeSelectAdicion = (idAdicion, idProducto) => {
    const indexAdicion = adiciones.findIndex(e => e.id == idAdicion);
    const dataAdicion = new Adiciones(adiciones[indexAdicion]);
    // dataAdicion.idInter = makeId();
    const indexProducto = listaProducto.findIndex(e => e.idInter == idProducto);
    const dataProducto = listaProducto[indexProducto];
    dataProducto.anadirModifique(dataAdicion);
    const newData = [...listaProducto];
    newData[indexProducto] = dataProducto;
    setListaProducto(newData);
  };

  const onClicAdicion = (idInterAdicion, idInterProducto) => {
    const indexProducto = listaProducto.findIndex(e => e.idInter == idInterProducto);
    const dataProducto = listaProducto[indexProducto];
    dataProducto.retirarModifique({ idInter: idInterAdicion });
    const newData = [...listaProducto];
    newData[indexProducto] = dataProducto;
    setListaProducto(newData);
  };

  const totalProductos = () => {
    let total = 0;
    if (listaProducto) {
      listaProducto.forEach(producto => {
        let totalProducto = producto.price;
        producto?.modifique.forEach(element => {
          totalProducto += element.price;
        });
        total += totalProducto;
      });
    }

    if (typeof (precioDeliveryManual) === 'number') {
      total += precioDeliveryManual
    } else if (dataDomicilio.price >= 0) {
      total += dataDomicilio.price;
    }

    return total;
  };



  return (
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
            {listaProducto && listaProducto.map((producto, index) => (
              <ProductoRow
                key={index}
                producto={producto}
                adiciones={adiciones}
                setListaProducto={setListaProducto}
                onChangeSelectAdicion={onChangeSelectAdicion}
                onClicAdicion={onClicAdicion}
              />
            ))}
            {
              dataDomicilio &&
              dataDomicilio.timeText &&
              <tr>
                <th>Domicilio</th>
                <th>{dataDomicilio.timeText}</th>
                <th>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={precioDeliveryManual ?? dataDomicilio.price}
                    onChange={(e) => {
                      setPrecioDeliveryManual(parseInt(e.target.value) ?? 0);
                    }}
                    className="form-control form-control-sm text-center"
                    style={{ width: '100px', display: 'inline-block' }}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => {
                      setPrecioDeliveryManual(null)
                    }}
                  >
                    Reset
                  </button>
                </th>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="2">TOTAL</th>
              <th>{formatearNumeroConPuntos(totalProductos())}</th>
            </tr>
          </tfoot>
        </Table>
      </div>
    </Card.Body>

  );
};

export default ResumenProductosForm;
