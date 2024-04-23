import { PatientPrediction } from '@/lib/types';
import PatientRecord from './patient-record';
import PredictionRisk from './prediction-risk';

function PredictionRow({ shapData, prediction }: PatientPrediction) {
  return (
    <div className='flex flex-col gap-4 py-8'>
      <PatientRecord {...shapData} />
      <div className='flex flex-col lg:flex-row gap-4'>
        <PredictionRisk risk={prediction} />
        <div className='lg:flex-1 flex items-center justify-center h-72 bg-white border shadow-md rounded-xl'>
          Explanation
        </div>
      </div>
    </div>
  );
}

export default PredictionRow;