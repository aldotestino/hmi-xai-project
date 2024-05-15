import { PatientPredictionWithData } from '@/lib/types';
import { Inbox } from 'lucide-react';
import Prediction from './prediction';
import { Accordion } from '@/components/ui/accordion';

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
    <main className='overflow-y-scroll w-full py-2'>
      <Accordion type="multiple" className="w-full">
        {predictions.map((prediction) => (
          <Prediction key={prediction.id} prediction={prediction}/>
        ))}
      </Accordion>
    </main>
  );
}

export default PredictionsContainer;