import { options } from '@/lib/constants';
import { PatientPrediction } from '@/lib/types';
import { createDataset } from '@/lib/utils';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
);

function Explanation({ shapBaseValue, shapData, shapValues }: Pick<PatientPrediction, 'shapValues' | 'shapBaseValue' | 'shapData'>) {

  const data = createDataset({ shapBaseValue, shapData, shapValues });

  return (
    <div className='p-4 flex justify-center bg-white border shadow-md rounded-xl'>
      <Bar options={options} data={data} className='w-full max-w-screen-md' />
    </div>
  );
}

export default Explanation;