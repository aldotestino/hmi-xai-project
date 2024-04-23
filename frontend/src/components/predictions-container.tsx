import { PatientPrediction } from '@/lib/types';
import { Inbox } from 'lucide-react';
import Prediction from './prediction-row';

interface PredictionsContainerProps {
  predictions: PatientPrediction[]
}

function PredictionsContainer({ predictions }: PredictionsContainerProps) {
  if(predictions.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center gap-2 text-slate-500">
        <Inbox size={50} />
        <p className='text-lg font-semibold text-center'>Compile the form on the right to start...</p>
      </main>
    );
  }

  return (
    <main className='overflow-y-scroll px-4 lg:px-8 divide-y'>
      {predictions.map((prediction, index) => (
        <Prediction key={index} {...prediction}/>
      ))}
    </main>
  );
}

export default PredictionsContainer;