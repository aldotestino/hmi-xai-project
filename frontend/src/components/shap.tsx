import { barOptions } from '@/lib/constants';
import { PatientPrediction } from '@/lib/types';
import { createShapDataset } from '@/lib/utils';
import { Bar } from 'react-chartjs-2';

function Shap({ shapBaseValue, shapData, shapValues }: Pick<PatientPrediction, 'shapValues' | 'shapBaseValue' | 'shapData'>) {

  const data = createShapDataset({ shapBaseValue, shapData, shapValues });

  return (
    <div className='p-4 flex justify-center bg-white border shadow-md rounded-xl'>
      <Bar options={barOptions} data={data} className='w-full max-w-screen-md' />
    </div>
  );
}

export default Shap;