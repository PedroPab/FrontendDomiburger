/* eslint-disable react/prop-types */
// OrderCard.js
import { useContext } from 'react'
import { Card, CardBody, CardSubtitle, CardFooter } from 'react-bootstrap';
import { CardHeader } from './CardHeader';
import { ResumenProductos } from './ResumenProductos';
import { ProductoList } from './ProductoList';
import { TotalPrecio } from './TotalPrecio';
import { ListButtonModalPedido } from './ListButtonModalPedido';
import { MiContexto } from '../../Context'
import { listaEstados } from '../../Utils/listEstados';
import { formatTimeString } from '../../Utils/formatTime';
import CopiableText from './CopiableText';

const OrderCard = ({ dataPedido }) => {
  const context = useContext(MiContexto)
  const role = context.tokenLogin?.user?.role
  const indexEstado = listaEstados.findIndex(e => e.name == dataPedido?.estado)
  const objEstado = listaEstados[indexEstado]
  const colorEstado = objEstado?.color
  const urlAdress = encodeURIComponent(dataPedido?.address.address_complete);

  const origin = dataPedido?.origin
  let colorCard = false
  if (origin?.name == 'formClient') {
    colorCard = `alert alert-warning`
  }

  return (
    <Card
      className={`mb-3 ${colorCard}`}
      style={{
        width: '25rem',
      }}
    >
      <CardBody>
        <CardHeader
          title={dataPedido?.name}
          orden={dataPedido?.numeroDeOrdenDelDia}
          horaCreate={formatTimeString(dataPedido?.date)}
          horaPronostico={formatTimeString({
            ...dataPedido?.date, _seconds: dataPedido?.date._seconds + (dataPedido?.duracionEstimada?.value * 60 || 0)
          })}
          urlMap={`https://www.google.com/maps/dir/?api=1&destination=${urlAdress}`}
          urlPhone={`tel:${dataPedido?.phone}`}
        />
        <CardSubtitle
          className='mb-3'
        >
          <CopiableText text={dataPedido?.address.direccionIput || dataPedido?.address.address_complete} />

        </CardSubtitle>
        <CardSubtitle
          className='mb-3'
        >
          {dataPedido?.note}
        </CardSubtitle>
        {/* lita de resmen de productos */}
        <ResumenProductos
          listProducts={dataPedido?.order}
        />
        {/*resumen de pruductos  */}
        <ProductoList
          productos={dataPedido?.order}
        />
        {/* totalPrecio */}
        <TotalPrecio
          listProducts={dataPedido?.orden}
          totalPrecio={dataPedido?.priceTotal.priceTotal}
          fee={dataPedido?.fee}
          yaPago={dataPedido?.pagoConfirmado?.confirmado}
        />
        <CardFooter>
          <ListButtonModalPedido dataPedido={dataPedido} role={role} />
        </CardFooter>
      </CardBody>
      <span
        style={{
          backgroundColor: `${colorEstado}`,
          'color': 'black'
        }}
        className={`position-absolute top-100 start-50 translate-middle badge rounded-pill`}>
        {dataPedido?.estado}
      </span>
    </Card >

  );
}



export default OrderCard;


export { OrderCard }