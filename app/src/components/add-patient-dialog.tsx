'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PatientInput } from '@/lib/types';
import PatientForm from './patient-form';
import { addPatient } from '@/server/actions';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';


function AddPatientDialog() {

  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function onSubmit(values: PatientInput) {
    await addPatient(values)
      .catch(() => {
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