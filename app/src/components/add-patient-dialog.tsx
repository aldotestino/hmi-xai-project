'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PatientInput, patientInputSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DialogClose } from '@radix-ui/react-dialog';

function AddPatientDialog() {

  const form = useForm<PatientInput>({
    resolver: zodResolver(patientInputSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      sex: 'M',
      birthDate: '',
    }
  });

  function onSubmit(values: PatientInput) {
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Aldo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Cognome</FormLabel>
                    <FormControl>
                      <Input placeholder="Testino" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="aldotestino@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Sesso</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Data di nascita</FormLabel>
                    <FormControl>
                      <Input placeholder="30/01/2001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Annulla</Button>
              </DialogClose>
              <Button type="submit">Aggiungi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddPatientDialog;