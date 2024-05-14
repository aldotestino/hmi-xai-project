'use client';

import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
import { PatientFeatures, patientFeaturesSchema } from '@/lib/types';
import Spinner from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { patientFeaturesFields } from '@/lib/constants';
import { predictAndExplain } from '@/server/actions';
import { Patient } from '@/db/schema/patient';
import { getAge } from '@/lib/utils';

function Field({ name, formControl, sex }: {
  name: keyof PatientFeatures;
  formControl: Control<PatientFeatures>;
  sex: string;
}) {
  
  const { label, description } = patientFeaturesFields[name];

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="number" disabled={name === 'pregnancies' && sex === 'M'} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PatientFeaturesForm({ 
  patient 
}: {
  patient: Patient;
}) {

  const form = useForm<PatientFeatures>({
    resolver: zodResolver(patientFeaturesSchema),
    defaultValues: {
      pregnancies: 0,
      glucose: 0,
      bloodPressure: 0,
      skinThickness: 0,
      insulin: 0,
      bmi: 0,
      diabetesPedigreeFunction: 0,
      age: getAge(patient.birthDate),
    },
  });

  async function onSubmit(values: PatientFeatures) {
    await predictAndExplain(patient.id, values);
  }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-rows-[auto,1fr,auto] overflow-y-hidden'>

        <p className='px-4 pt-4 text-lg font-semibold text-muted-foreground'>Features</p>

        <div className='p-4 space-y-2 overflow-y-scroll'>
          {Object.keys(patientFeaturesSchema.shape).map(key => (
            <Field key={key} name={key as keyof PatientFeatures} formControl={form.control} sex={patient.sex} />
          ))}
        </div>
        
        <div>
          <Separator />
          <div className='p-4 text-right'>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting && <Spinner className='mr-2' />}
              Predict
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default PatientFeaturesForm;