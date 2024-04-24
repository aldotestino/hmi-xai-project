import { PatientPrediction } from '@/lib/types';
import { createDataset } from '@/lib/utils';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Explanation',
    },
  },
};

function Explanation({ shapBaseValue, shapData, shapValues }: Pick<PatientPrediction, 'shapValues' | 'shapBaseValue' | 'shapData'>) {

  const data = createDataset({ shapBaseValue, shapData, shapValues });

  return (
    <div className='lg:flex-1 flex items-center justify-center max-h-96 bg-white border shadow-md rounded-xl p-4'>
      <Bar options={options} data={data} />
    </div>
  );
}

export default Explanation;