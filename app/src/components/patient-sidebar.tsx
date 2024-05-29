import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PatientFeatures } from '@/lib/types';
import PatientFeaturesForm from '@/components/patient-features-form';
import { cn } from '@/lib/utils';
import { Patient } from '@/db/schema/patient';

function PatientSidebar({
  patient,
  lastFeatueres
}: {
  patient: Patient,
  lastFeatueres?: PatientFeatures
}) {

  return (
    <div className='w-80 h-full border-r grid grid-rows-[auto,1fr] overflow-y-hidden'>
      <div>
        <div className='flex items-center gap-2 p-4'>
          <Link href="/dashboard" className={cn(buttonVariants({ variant: 'ghost' }), 'w-8 h-8 p-0')}> 
            <ArrowLeft className='w-4 h-4' />
          </Link>
          <h1 className="text-xl font-semibold">{patient.firstName} {patient.lastName}</h1>
        </div>
        <Separator />
      </div>
      <PatientFeaturesForm patient={patient} defaultValues={lastFeatueres} />
    </div>
  );
}

export default PatientSidebar;