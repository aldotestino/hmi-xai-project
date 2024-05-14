'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PatientInput } from '@/lib/types';
import PatientForm from './patient-form';


function AddPatientDialog() {

  async function onSubmit(values: PatientInput) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Aggiungi</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aggiungi paziente</DialogTitle>
          <DialogDescription>
            Aggiungi un nuovo paziente.
          </DialogDescription>
        </DialogHeader>
        <PatientForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}

export default AddPatientDialog;