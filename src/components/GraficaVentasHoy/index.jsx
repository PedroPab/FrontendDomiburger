import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
// eslint-disable-next-line no-unused-vars
import Pedido from '../../Utils/class/Pedido';
import { convertirHoraDeUnixADate } from '../../Utils/formatTime';
import { Lapso } from '../../Utils/class/LapsoEstadisticas';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


/**
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {[]} props.listPedidos - La lista de pedidos del día.
 * @return {JSX.Element} El elemento de la gráfica de ventas de hoy.
 */
const GraficaVentasHoy = ({ listPedidos }) => {

  const timePart = 900; // en segundos

  const dataEstadisticas = listPedidos.map(pedidos => {
    let { labels, dataData } = OrganisarDatosEstadisticas(pedidos.data, timePart, pedidos.dayInit);
    return { labels, dataData, name: pedidos.name, color: pedidos.color }
  })
  console.log("🚀 ~ file: index.jsx:42 ~ dataEstadisticas ~ dataEstadisticas:", dataEstadisticas)

  const datasets = dataEstadisticas.map(e => {
    return {
      label: e.name,
      data: e.dataData,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: e.color,
      borderWidth: 1,
    }
  })
  // Datos de ejemplo para la gráfica
  const data = {
    labels: dataEstadisticas[0].labels,
    datasets: datasets,
  };

  return (
    <div>
      <h2>Estadísticas de ventas de hoy</h2>
      <ol>

      </ol>
      <Line data={data} />
    </div>
  );
};



function OrganisarDatosEstadisticas(listPedidos, timePart, dayInit = undefined) {
  const listPedidosMod = [...listPedidos];

  const listPedidsOrganisado = ordenarPorFecha(listPedidosMod);


  const timeInit = new Date(dayInit)
  timeInit.setHours(15, 0, 0, 0);
  const timeFinality = new Date(dayInit)
  timeFinality.setHours(23, 0, 0, 0);


  // separamos los pedidos en bloques del lapso establecido
  let lapsoActual = timeInit;
  /** @type {Lapso[]} */
  const listaLapsos = [];

  for (let index = 0; lapsoActual < timeFinality; index++) {
    const fechaInitMod = new Date(timeInit);
    fechaInitMod.setTime(fechaInitMod.getTime() + (timePart * index) * 1000);

    const lapso = new Lapso({
      timeInit: lapsoActual,
      timeFinality: fechaInitMod,
    });
    listaLapsos.push(lapso);
    lapsoActual = fechaInitMod;

  }


  listPedidsOrganisado.forEach(pedido => {
    const horaPedido = convertirHoraDeUnixADate(pedido.date);

    const lapsoAdecuado = listaLapsos.findIndex(lapso => {

      if (horaPedido >= lapso.timeInit) {

        if (horaPedido <= lapso.timeFinality) {
          return true;
        }
      }
      return false;
    });

    if (lapsoAdecuado != -1) {
      listaLapsos[lapsoAdecuado].addPedido(pedido);
    }
  });


  let labels = [];
  let dataData = [];


  listaLapsos.forEach(lapso => {
    labels.push(lapso.timeText);
    dataData.push(lapso.pedidos.length);
  });
  return { labels, dataData };
}

function ordenarPorFecha(array) {
  return array.sort((a, b) => convertirHoraDeUnixADate(a.date) - convertirHoraDeUnixADate(b.date));
}


export default GraficaVentasHoy;
