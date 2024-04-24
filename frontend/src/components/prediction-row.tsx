import { PatientPrediction } from '@/lib/types';
import PatientRecord from './patient-record';
import Explanation from './explanation';

function PredictionRow({ shapData, prediction, shapValues, shapBaseValue }: PatientPrediction) {
  return (
    <div className='space-y-4 py-4'>
      <PatientRecord shapData={shapData} prediction={prediction} />
      <Explanation shapBaseValue={shapBaseValue} shapValues={shapValues} shapData={shapData} />
    </div>
  );
}

export default PredictionRow;