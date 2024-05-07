import { scatterOptions } from '@/lib/constants';
import { PatientEmbedding } from '@/lib/types';
import { createTsneDataset } from '@/lib/utils';
import { Scatter } from 'react-chartjs-2';

function Shap({ embeddings }: {embeddings: PatientEmbedding[]}) {

  const data = createTsneDataset(embeddings);

  return (
    <div className='p-4 flex justify-center bg-white border shadow-md rounded-xl'>
      <Scatter options={scatterOptions} data={data} className='w-full max-w-screen-md' />
    </div>
  );
}

export default Shap;