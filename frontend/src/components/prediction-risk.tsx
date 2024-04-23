import { cn } from '@/lib/utils';

interface PredictionRiskProps {
  risk: number
}

function PredictionRisk({ risk }: PredictionRiskProps) {
  return (
    <div className="lg:w-1/4 lg:min-w-48 p-4 bg-white border shadow-md rounded-xl flex flex-col items-center justify-center">
      <p className="text-muted-foreground font-semibold text-lg">Risk:</p>
      <p className={cn('text-2xl lg:text-3xl font-bold', risk < 50 ? 'text-green-500' : 'text-red-500')}>{risk}<span className='text-muted-foreground font-normal text-lg'>%</span></p>
    </div>
  );
}

export default PredictionRisk;