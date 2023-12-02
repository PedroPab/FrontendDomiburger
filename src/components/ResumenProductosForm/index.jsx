import { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import ProductoRow from './../../components/ProductoRow'; // Nuevo componente
import { UtilsApi } from './../../Utils/utilsApi';
import { makeid } from '../../Utils/makeId';

const ResumenProductosForm = ({ listaProducto, setListaProducto }) => {
  const [adiciones, setAdiciones] = useState([]);

  useEffect(() => {
    UtilsApi({ peticion: 'productos/filter?key=type&options===&value=Adicion', vervo: 'GET' })
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
            {listaProducto && listaProducto.map(producto => (
              <ProductoRow
                key={producto.idInter}
                producto={producto}
                adiciones={adiciones}
                setListaProducto={setListaProducto}
                onChangeSelectAdicion={onChangeSelectAdicion}
                onClicAdicion={onClicAdicion}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </Card.Body>
  );
};

export default ResumenProductosForm;
