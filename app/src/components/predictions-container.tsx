import { PatientPredictionWithData } from '@/lib/types';
import { Inbox } from 'lucide-react';
import Prediction from './prediction';

function PredictionsContainer({ 
  predictions 
}: {
  predictions: PatientPredictionWithData[]
}) {
  if(predictions.length === 0) {
    return (
      <main className="flex items-center justify-center flex-col text-muted-foreground">
        <Inbox size={50} />
        <p className='text-lg font-semibold text-center'>Compila il form per iniziare...</p>
      </main>
    );
  }

  return (
    <main className='overflow-y-scroll w-full px-4 divide-y'>
      {predictions.map((prediction) => (
        <Prediction key={prediction.id} prediction={prediction}/>
      ))}
    </main>
  );
}

export default PredictionsContainer;