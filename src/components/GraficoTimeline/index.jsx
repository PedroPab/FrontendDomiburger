import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Ahora puedes usar el componente <Bar> de react-chartjs-2 en tu aplicación

const GraficoTimeline = ({ datos }) => {
  const data = {
    labels: datos.map(d => d.x),
    datasets: [{
      label: 'Duración de Eventos',
      data: datos.map(d => d.y),
      backgroundColor: 'rgba(0, 123, 255, 0.5)',
      borderColor: 'rgba(0, 123, 255, 1)',
      borderWidth: 1
    }]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default GraficoTimeline;
