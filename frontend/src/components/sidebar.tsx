import { Patient } from '@/lib/types';
import PatientForm from './patient-form';
import SidebarHeader from './sidebar-header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarProps {
  onFormSubmit: (values: Patient) => void;
  isFormLoading: boolean;
}

function Sidebar({ onFormSubmit, isFormLoading }: SidebarProps) {

  const [open, setOpen] = useState(true);
  const Icon = open ? ChevronLeft : ChevronRight;

  return (
    <div className='h-full overflow-y-hidden flex items-center'>
      <div className={cn('bg-white w-80 h-full border-r shadow-md grid grid-rows-[auto,1fr] rounded-r-xl', !open && 'w-0 invisible')}>
        <SidebarHeader />
        <PatientForm onSubmit={onFormSubmit} isLoading={isFormLoading} />
      </div>
      <Icon onClick={() => setOpen(prev => !prev)} className='h-8 w-8 text-slate-500 hover:text-slate-600 active:text-slate-700 cursor-pointer' />
    </div>
  );
}

export default Sidebar;