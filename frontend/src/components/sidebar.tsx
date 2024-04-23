import { Patient } from '@/lib/types';
import PatientForm from './patient-form';
import SidebarHeader from './sidebar-header';
interface SidebarProps {
  onFormSubmit: (values: Patient) => void;
  isFormLoading: boolean;
}

function Sidebar({ onFormSubmit, isFormLoading }: SidebarProps) {

  return (
    <div className="bg-white w-80 h-full border-r shadow-md grid grid-rows-[auto,1fr] overflow-y-hidden rounded-r-xl">
      <SidebarHeader />
      <PatientForm onSubmit={onFormSubmit} isLoading={isFormLoading} />
    </div>
  );
}

export default Sidebar;