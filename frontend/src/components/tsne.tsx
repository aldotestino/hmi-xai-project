import { scatterOptions } from '@/lib/constants';
import { PatientEmbedding } from '@/lib/types';
import { cn, createTsneDataset } from '@/lib/utils';
import { Scatter } from 'react-chartjs-2';

function Shap({ embeddings, prediction }: {embeddings: PatientEmbedding[], prediction: number}) {

  const data = createTsneDataset(embeddings);

  return (
    <div>
      <div className="flex gap-4 items-center p-2">
        <div className="flex gap-2 items-center">
          <div className="h-6 w-6 border-2 border-red-600 bg-red-400 rounded-full"></div>
          <p>Has diabetes</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="h-6 w-6 border-2 border-blue-600 bg-blue-400 rounded-full"></div>
          <p>No diabetes</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className={cn('h-6 w-6 border-4 border-black', prediction > 50 ? 'bg-red-400' : 'bg-blue-400')}></div>
          <p>Current</p>
        </div>
      </div>
      <div className='p-4 flex justify-center bg-white border shadow-md rounded-xl'>
        <Scatter options={scatterOptions} data={data} className='w-full max-w-screen-md' />
      </div>
    </div>
  );
}

export default Shap;