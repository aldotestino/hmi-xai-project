'use client';

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import Spinner from '@/components/ui/spinner';
import { deletePatient } from '@/server/actions';
import { useToast } from './ui/use-toast';

function DeletePatientAlert({
  patientId
}: {
  patientId: number;
}) {

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  async function onDelete() {
    setIsSubmitting(true);
    await deletePatient(patientId)
      .catch(() => {
        toast({
          title: 'Errore',
          description: 'Si è verificato un errore, riprova più tardi.',
          variant: 'destructive'
        });
      }).finally(() => {
        setIsSubmitting(false);
        setOpen(false);
      });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Elimina</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Questa azione non può essere annullata. Questo eliminerà definitivamente 
            il paziente {patientId} e rimuoverà i suoi dati dal server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>     
          <Button onClick={onDelete} variant="destructive" disabled={isSubmitting}>
            {isSubmitting && <Spinner className="mr-2" />}
              Elimina
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePatientAlert;
