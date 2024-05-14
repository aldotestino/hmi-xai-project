'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PatientInput } from '@/lib/types';
import PatientForm from '@/components/patient-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { SquarePen } from 'lucide-react';


function UpdatePatientDialog({
  patientId,
  defaultValues,
}: {
  patientId: number;
  defaultValues: PatientInput;
}) {

  async function onSubmit(values: PatientInput) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <SquarePen className="mr-2 h-4 w-4" />
          <span>Aggiorna</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aggiorna paziente</DialogTitle>
          <DialogDescription>
            Stai aggiornando i dati del paziente {patientId}.
          </DialogDescription>
        </DialogHeader>
        <PatientForm onSubmit={onSubmit} defaultValues={defaultValues} submitButtonLabel="Aggiorna" />
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePatientDialog;