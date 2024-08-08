import LayoutRecepcion from '../../Layout/Recepcion';
import ListCardPages from '../../components/ListCardPages';

//para mostrar los pedidos en una tabla y tener las estadística a la mano
const EstadisticasHome = () => {
  return (
    <>
      <LayoutRecepcion>
        <ListCardPages
          pages={[
            {
              title: 'Domiciliarios',
              description: 'Cuanto domicilios a echo cada domiciliario',
              path: 'domiciliarios'
            },
            {
              title: 'Ventas Hoy',
              description: 'Gráfica de todas las ventas del dia colores',
              path: 'ventas/hoy'
            },
            {
              title: 'Clientes',
              description: 'No esta disponible, pero mostrar las estadisticas de los nuevos clientes',
              path: 'clientes'
            },
            {
              title: 'Ventas del Mes',
              description: 'Mostramos las ventas del mes en una gráfica de calendario',
              path: 'ventasDelMes'
            },
          ]}
        />
      </LayoutRecepcion>
    </>
  )
}

export default EstadisticasHome