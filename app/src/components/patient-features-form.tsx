'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, useForm } from 'react-hook-form';
import { PatientFeatures, patientFeaturesSchema } from '@/lib/types';
import Spinner from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { patientFeaturesFields } from '@/lib/constants';
import { predictAndExplain } from '@/server/actions';
import { Patient } from '@/db/schema/patient';
import { cn, getAge } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

function Field({ name, formControl, sex }: {
  name: keyof PatientFeatures;
  formControl: Control<PatientFeatures>;
  sex: Patient['sex'];
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
  patient,
  defaultValues
}: {
  patient: Patient;
  defaultValues?: PatientFeatures;
}) {

  const { toast } = useToast();

  const form = useForm<PatientFeatures>({
    resolver: zodResolver(patientFeaturesSchema),
    defaultValues: defaultValues || {
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
    await predictAndExplain(patient.id, values)
      .catch(() => {
        toast({
          title: 'Errore',
          description: 'Si è verificato un errore, riprova più tardi.',
          variant: 'destructive'
        });
      });
  }

  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const featureFields = useMemo(() => Object.keys(patientFeaturesSchema.shape)
    .filter(key => patientFeaturesFields[key as keyof PatientFeatures].label.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm]);

  function handleSearch() {
    if(!isSearching) {
      setIsSearching(true);
    }else {
      setIsSearching(false);
      setSearchTerm('');
    }
  }
    
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-rows-[auto,1fr,auto] overflow-y-hidden overflow-x-hidden'>

        <div>
          <div className='flex items-center w-full'>
            <div className='relative h-full flex-1 flex items-center mr-6 p-4 pr-0'>
              <p className='text-lg font-semibold text-muted-foreground'>Features</p>
              <Input
                disabled={!isSearching}
                className={cn('absolute transition-transform duration-300', isSearching ? 'translate-x-0' : 'translate-x-60')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder='Filter feature...'
              />
            </div>
            <div className='z-10 bg-background p-4 pl-0'>
              <Button variant="ghost" type='button' onClick={handleSearch}>
                <Search className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <FormDescription className='p-4 pt-0'>Modify the features and click on &quot;Predict&quot; to start a new simulation</FormDescription>
        </div>


        <div className='p-4 space-y-4 overflow-y-scroll'>
          {featureFields.map(key => (
            <Field key={key} name={key as keyof PatientFeatures} formControl={form.control} sex={patient.sex} />
          ))}
          {featureFields.length === 0 && <p className='text-muted-foreground'>Nessun parametro trovato.</p>}
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