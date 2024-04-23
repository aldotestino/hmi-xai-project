import { Patient } from '@/lib/types';
import PatientForm from './patient-form';
import { Separator } from './ui/separator';

interface SidebarProps {
  onFormSubmit: (values: Patient) => void;
  isFormLoading: boolean;
}

function sidebar({ onFormSubmit, isFormLoading }: SidebarProps) {

  return (
    <div className="bg-white min-w-80 w-1/4 h-full border-r shadow-md grid grid-rows-[auto,1fr] overflow-y-hidden rounded-r-xl">
      <div>
        <h1 className="p-4 text-3xl font-semibold">Diabetes</h1>
        <Separator />
        <p className='p-4 text-lg font-semibold text-muted-foreground'>Features</p>
      </div>
      <PatientForm onSubmit={onFormSubmit} isLoading={isFormLoading} />
    </div>
  );
}

export default sidebar;