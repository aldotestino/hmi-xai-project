import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Patient, patientSchema } from '@/lib/types';
import PatientFormField from './patient-form-field';
import Spinner from './spinner';

interface PatientFormProps {
  onSubmit: (values: Patient) => void;
  isLoading: boolean;
}

function PatientForm({ onSubmit, isLoading }: PatientFormProps) {

  const form = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      pregnancies: 6,
      glucose: 103,
      bloodPressure: 72,
      skinThickness: 32,
      insulin: 190,
      bmi: 37.7,
      diabetesPedigreeFunction: 0.324,
      age: 55,
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
            <Button disabled={isLoading} type="submit" className="inline-flex items-center">
              {isLoading ? <><Spinner />Processing...</> : 'Predict'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default PatientForm;