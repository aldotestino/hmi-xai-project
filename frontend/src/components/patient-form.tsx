import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Patient, patientSchema } from '@/lib/types';
import PatientFormField from './patient-form-field';

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
            <Button disabled={isLoading} type="submit" className="inline-flex items-center">{
              isLoading ? 
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </> : 
                'Predict'
            }</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default PatientForm;