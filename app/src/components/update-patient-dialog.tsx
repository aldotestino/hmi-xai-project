'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PatientInput } from '@/lib/types';
import PatientForm from '@/components/patient-form';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { SquarePen } from 'lucide-react';
import { updatePatient } from '@/server/actions';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';


function UpdatePatientDialog({
  patientId,
  defaultValues,
}: {
  patientId: number;
  defaultValues: PatientInput;
}) {

  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function onSubmit(values: PatientInput) {
    await updatePatient(patientId, values).catch(() => {
      toast({
        title: 'Errore',
        description: 'Si è verificato un errore, riprova più tardi.',
        variant: 'destructive'
      });
    }).finally(() => {
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <SquarePen className="mr-2 h-4 w-4" />
          <span>Update</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update patient</DialogTitle>
          <DialogDescription>
            You are updating patient {patientId}.
          </DialogDescription>
        </DialogHeader>
        <PatientForm onSubmit={onSubmit} defaultValues={defaultValues} submitButtonLabel="Update" />
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePatientDialog;