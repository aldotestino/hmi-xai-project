import { scatterOptions } from '@/lib/constants';
import { PatientEmbedding } from '@/lib/types';
import { createEmbeddingDataset } from '@/lib/utils';
import { Scatter } from 'react-chartjs-2';

function Embedddings({ embeddings }: {embeddings: PatientEmbedding[]}) {

  const data = createEmbeddingDataset(embeddings);

  return (
    <div className='p-4 flex justify-center bg-white border shadow-md rounded-xl'>
      <Scatter options={scatterOptions} data={data} className='w-full max-w-screen-md' />
    </div>
  );
}

export default Embedddings;