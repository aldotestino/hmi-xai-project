import { PatientInput } from '@/lib/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import UpdatePatientDialog from '@/components/update-patient-dialog';
import DeletePatientAlert from '@/components/delete-patient-alert';
import { Button } from '@/components/ui/button';

function PatientActions({
  patient
}: {
  patient: PatientInput & {id: number};
}) {

  const { id, ...defaultValues } = patient;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Apri menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Azioni</DropdownMenuLabel>
        <UpdatePatientDialog patientId={id} defaultValues={defaultValues} />
        <DeletePatientAlert patientId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PatientActions;