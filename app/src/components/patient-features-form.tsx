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

function Field({ name, formControl }: {
  name: keyof PatientFeatures;
  formControl: Control<PatientFeatures>;
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
            <Input type="number" {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function PatientFeaturesForm({ 
  patientId 
}: {
  patientId: number;
}) {

  const form = useForm<PatientFeatures>({
    resolver: zodResolver(patientFeaturesSchema),
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

  async function onSubmit(values: PatientFeatures) {
    await predictAndExplain(patientId, values);
  }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-rows-[auto,1fr,auto] overflow-y-hidden'>

        <p className='px-4 pt-4 text-lg font-semibold text-muted-foreground'>Features</p>

        <div className='p-4 space-y-2 overflow-y-scroll'>
          {Object.keys(patientFeaturesSchema.shape).map(key => (
            <Field key={key} name={key as keyof PatientFeatures} formControl={form.control} />
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