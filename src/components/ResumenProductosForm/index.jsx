import { Card, Table, Button } from 'react-bootstrap';
import formatearNumeroConPuntos from './../../Utils/formatearNumeroConPuntos'
import { SelectAdicionClient } from '../SelectAdicionClient';
import { UtilsApi } from './../../Utils/utilsApi'
import { useEffect, useState } from "react";
import { makeid } from '../../Utils/makeId';

const ResumenProductosForm = ({ listaProducto, setListaProducto }) => {
  const [adiciones, setAdiciones] = useState([]);
  useEffect(() => {
    UtilsApi({ peticion: 'productos/filter?key=type&options===&value=Adicion', vervo: 'GET' })
      .then(data => {
        return data.map(e => e.data)
      })
      .then(data => setAdiciones(data))
      .catch(error => console.log(error))
  }, [])

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
                  console.log(`listaProducto`, producto.modifique);

                  return (
                    <tr key={producto.idInter} >
                      <td ><small >{producto.name}
                        <div>
                          {
                            producto?.modifique &&
                            producto.modifique.map(modifique => {
                              return (
                                <span
                                  className='badge'
                                  style={{
                                    backgroundColor: modifique.colorPrimary,
                                  }}
                                  key={modifique.idInter}
                                  onClick={() => onClicAdicion(modifique.idInter, producto.idInter)}
                                >
                                  {modifique.name}

                                </span>
                              )
                            })
                          }
                        </div></small></td>
                      <td><SelectAdicionClient producto={producto} onChangeSelect={onChangeSelectAdicion} adiciones={adiciones} /></td>
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