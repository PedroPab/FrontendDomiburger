/* eslint-disable react/prop-types */
// OrderCard.js
import { useContext } from 'react'
import { Card, CardBody, CardSubtitle, CardFooter, Badge } from 'react-bootstrap';
import { CardHeader } from '../CardHeader';
import { ResumenProductos } from '../ResumenProductos';
import { ProductoList } from '../ProductoList';
import { TotalPrecio } from '../TotalPrecio';
import { ListButtonModalPedido } from '../ListButtonModalPedido';
import { MiContexto } from '../../Context'

const OrderCard = ({ dataPedido }) => {
  const context = useContext(MiContexto)
  const role = context.tokenLogin?.user?.role

  return (
    <Card
      className='mb-3'
      style={{
        width: '30rem'
      }}
    >
      <CardBody>
        <CardHeader
          title={dataPedido.name}
          orden={dataPedido.numeroDeOrdenDelDia}
          horaCreate={`4:01 pm`}
          horaPronostico={`4:01 pm`}
          urlMap={``}
          urlPhone={`h`}
        />
        {/* direccion completa */}
        <CardSubtitle>
          {dataPedido.address.address_complete}
        </CardSubtitle>
        {/* lita de resmen de productos */}
        <ResumenProductos
          listProducts={dataPedido.order}
        />
        {/*resumen de pruductos  */}
        <ProductoList
          productos={dataPedido.order}
        />
        {/* totalPrecio */}
        <TotalPrecio
          listProducts={dataPedido.orden}
          totalPrecio={dataPedido.priceTotal.COP}
          fee={dataPedido.fee}
        />
        <CardFooter>
          <ListButtonModalPedido dataPedido={dataPedido} role={role} />
        </CardFooter>
      </CardBody>
      <Badge>
        {dataPedido.estado}
      </Badge>
    </Card>
  );
}



export default OrderCard;


export { OrderCard }