import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PatientInput, patientInputSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { DateInput } from './ui/date-input';

function PatientForm({
  submitButtonLabel = 'Aggiungi',
  defaultValues,
  onSubmit
}: {
  submitButtonLabel?: string;
  defaultValues?: PatientInput;
  onSubmit: (values: PatientInput) => void;
}) {

  console.log(defaultValues);
  
  const form = useForm<PatientInput>({
    resolver: zodResolver(patientInputSchema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
      email: '',
      sex: 'M'
    }
  });

  return (
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
                  <DateInput onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button variant="outline">Annulla</Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner className="mr-2" />}
            {submitButtonLabel}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default PatientForm;