import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import ProductoRow from './../../components/ProductoRow'; // Nuevo componente
import { UtilsApi } from './../../Utils/utilsApi';
import { makeid } from '../../Utils/makeId';
import formatearNumeroConPuntos from '../../Utils/formatearNumeroConPuntos';

const ResumenProductosForm = ({ listaProducto, setListaProducto, dataDomicilio }) => {
  const [adiciones, setAdiciones] = useState([]);

  useEffect(() => {
    UtilsApi({ url: 'productos/filter?key=type&options===&value=Adicion', method: 'GET' })
      .then(data => data.map(e => e.data))
      .then(data => setAdiciones(data))
      .catch(error => console.log(error));
  }, []);

  const onChangeSelectAdicion = (idAdicion, idProducto) => {
    //buscamos la adcion
    const indexAdicion = adiciones.findIndex(e => e.id == idAdicion)
    const dataAdicion = adiciones[indexAdicion]
    //le ponemo un id unico
    dataAdicion.idInter = makeid()
    //buscamo le prouducto
    const indexProducto = listaProducto.findIndex(e => e.idInter == idProducto)
    const dataProducto = listaProducto[indexProducto]
    //le agregamos la adcion
    dataProducto.anadirModifique(dataAdicion)
    //remplasamo por el nuevo objeto de proudco y actualisamos el estado de los productos
    const newData = [...listaProducto]
    newData[indexProducto] = dataProducto
    setListaProducto(newData)
  }
  const onClicAdicion = (idInterAdicion, idInterProducto) => {
    //le ponemo un id unico
    //buscamo le prouducto
    const indexProducto = listaProducto.findIndex(e => e.idInter == idInterProducto)
    const dataProducto = listaProducto[indexProducto]
    //le agregamos la adcion
    dataProducto.retirarModifique(idInterAdicion)
    //remplasamo por el nuevo objeto de proudco y actualisamos el estado de los productos
    const newData = [...listaProducto]
    newData[indexProducto] = dataProducto
    setListaProducto(newData)

  }

  const totalProductos = () => {
    let total = 0
    if (listaProducto) {
      listaProducto.forEach(producto => {
        let totalProducto = producto.price;
        producto?.modifique.forEach(element => {
          totalProducto += element.price;
        });
        total += totalProducto
      })
    }

    if (dataDomicilio.price) {
      total += dataDomicilio.price
    }


    return total
  }

  const totalCompra = totalProductos()


  return (
    <div className='m-3'>
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
                <tr>
                  <th>Domicilio</th>
                  <th>{dataDomicilio.timeText}</th>
                  <th>{dataDomicilio.price}</th>
                </tr>
              }
            </tbody>
            <tfoot>
              <th>TOTAL</th>
              <th></th>
              <th>{formatearNumeroConPuntos(totalCompra)}</th>
            </tfoot>
          </Table>
        </div>
      </Card.Body>
    </div>
  );
};

export default ResumenProductosForm;
