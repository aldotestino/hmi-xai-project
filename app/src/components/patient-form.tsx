import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
import { PatientInput, patientInputSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/ui/spinner';
import { DateInput } from './ui/date-input';

function Field({
  name,
  label,
  placeholder,
  formControl
}: {
  name: keyof Pick<PatientInput, 'firstName' | 'lastName' | 'email'>,
  label: string,
  placeholder?: string,
  formControl: Control<PatientInput>
}) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PatientForm({
  submitButtonLabel = 'Aggiungi',
  defaultValues,
  onSubmit
}: {
  submitButtonLabel?: string;
  defaultValues?: PatientInput;
  onSubmit: (values: PatientInput) => void;
}) {
  
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
          <Field name="firstName" label="Nome" formControl={form.control} />
          <Field name="lastName" label="Cognome" formControl={form.control} />
        </div>
        <Field name="email" label="Email" formControl={form.control} />
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
        <DialogFooter>
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