import { PatientPrediction } from '@/lib/types';
import PatientRecord from './patient-record';
import Shap from './shap';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip, PointElement, Legend } from 'chart.js';
import Embedddings from './embeddings';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  PointElement,
  Legend
);

function PredictionRow({ shapData, prediction, shapValues, shapBaseValue, embeddings }: PatientPrediction) {
  return (
    <div className='space-y-4 w-full py-4 lg:py-6 overflow-x-hidden'>
      <PatientRecord shapData={shapData} prediction={prediction} />
      <Embedddings embeddings={embeddings} />
      <Shap shapBaseValue={shapBaseValue} shapValues={shapValues} shapData={shapData} />
    </div>
  );
}

export default PredictionRow;