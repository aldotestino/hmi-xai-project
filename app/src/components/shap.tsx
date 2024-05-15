import { barOptions } from '@/lib/constants';
import { PatientPredictionWithData } from '@/lib/types';
import { createShapDataset } from '@/lib/utils';
import { Bar } from 'react-chartjs-2';

function Shap({ shapBaseValue, data, shapValues }: Pick<PatientPredictionWithData, 'shapValues' | 'shapBaseValue' | 'data'>) {

  const shapData = createShapDataset({ shapBaseValue, data, shapValues });

  return (
    <div className='p-4 flex justify-center border rounded-md'>
      <Bar options={barOptions} data={shapData} className='w-full max-w-screen-md' />
    </div>
  );
}

export default Shap;