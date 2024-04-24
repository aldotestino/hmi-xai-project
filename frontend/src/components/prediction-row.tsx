import { PatientPrediction } from '@/lib/types';
import PatientRecord from './patient-record';
import Explanation from './explanation';

function PredictionRow({ shapData, prediction, shapValues, shapBaseValue }: PatientPrediction) {
  return (
    <div className='space-y-4 w-full py-4 lg:py-6'>
      <PatientRecord shapData={shapData} prediction={prediction} />
      <Explanation shapBaseValue={shapBaseValue} shapValues={shapValues} shapData={shapData} />
    </div>
  );
}

export default PredictionRow;