import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PatientFeatures } from '@/lib/types';
import PatientFeaturesForm from '@/components/patient-features-form';
import { cn } from '@/lib/utils';

function PatientSidebar({
  patientId
}: {
  patientId: number
}) {

  return (
    <div className="h-full overflow-y-hidden flex items-center">
      <div className="bg-white w-80 h-full border-r grid grid-rows-[auto,1fr]">
        <div>
          <div className='flex items-center gap-2 p-4'>
            <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), 'w-8 h-8 p-0')}> 
              <ArrowLeft className='w-4 h-4' />
            </Link>
            <h1 className="text-xl font-semibold">Diabetes</h1>
          </div>
          <Separator />
        </div>
        <PatientFeaturesForm patientId={patientId} />
      </div>
    </div>
  );
}

export default PatientSidebar;