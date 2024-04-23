import { Patient } from '@/lib/types';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Control } from 'react-hook-form';
import { patientFiels } from '@/lib/constants';

interface PatientFormFieldProps {
  name: keyof Patient;
  formControl: Control<Patient>;
}

function PatientFormField({ name, formControl }: PatientFormFieldProps) {
  
  const { label, description } = patientFiels[name];

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PatientFormField;