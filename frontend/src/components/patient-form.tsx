import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Patient, patientSchema } from '@/lib/types';
import PatientFormField from './patient-form-field';

interface PatientFormProps {
  onSubmit: (values: Patient) => void;
}

function PatientForm({ onSubmit }: PatientFormProps) {

  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      age: 0,
      glucose: 0,
      insulin: 0,
      skinThickness: 0,
      bmi: 0,
      dpf: 0,
      bloodPressure: 0,
      pregnancies: 0,
    },
  });
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-rows-[1fr,auto] overflow-y-hidden'>
        
        <div className='px-4 space-y-2 overflow-y-scroll'>
          {Object.keys(patientSchema.shape).map(key => (
            <PatientFormField key={key} name={key as keyof Patient} formControl={form.control} />
          ))}
        </div>
        
        <div className='pt-4'>
          <Separator />
          <div className='p-4 text-right'>
            <Button type="submit">Predict</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default PatientForm;