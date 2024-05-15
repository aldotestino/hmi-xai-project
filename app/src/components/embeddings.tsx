import { scatterOptions } from '@/lib/constants';
import { PatientPredictionWithData } from '@/lib/types';
import { createEmbeddingDataset } from '@/lib/utils';
import { Scatter } from 'react-chartjs-2';

function Embedddings({ 
  embeddings, 
  prediction 
}: {
  embeddings: PatientPredictionWithData['embeddings'],
  prediction: number
}) {

  const data = createEmbeddingDataset(embeddings, prediction);

  return (
    <div className='p-4 flex justify-center border rounded-md'>
      <Scatter options={scatterOptions} data={data} className='w-full max-w-screen-md' />
    </div>
  );
}

export default Embedddings;