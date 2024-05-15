'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PatientInput } from '@/lib/types';
import PatientForm from './patient-form';
import { addPatient } from '@/server/actions';
import { useState } from 'react';
import { Plus } from 'lucide-react';


function AddPatientDialog() {

  const [open, setOpen] = useState(false);

  async function onSubmit(values: PatientInput) {
    await addPatient(values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className='h-4 w-4 mr-2'/>
          Aggiungi
        </Button>
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