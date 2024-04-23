import { Patient } from '@/lib/types';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Control } from 'react-hook-form';

interface PatientFormFieldProps {
  name: keyof Patient;
  formControl: Control<Patient>;
}

function PatientFormField({ name, formControl }: PatientFormFieldProps) {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{name}</FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PatientFormField;