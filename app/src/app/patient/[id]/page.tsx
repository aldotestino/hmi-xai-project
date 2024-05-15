import PatientSidebar from '@/components/patient-sidebar';
import PredictionsContainer from '@/components/predictions-container';
import { getPatient } from '@/server/queries';
import React from 'react';

async function PatientPage({ params }: {params: {id: number}}) {

  const { predictions, ...patient } = await getPatient(params.id);

  return (
    <div className='h-screen grid grid-cols-[auto,1fr] overflow-y-hidden'>
      <PatientSidebar patient={patient}  />
      <PredictionsContainer predictions={predictions} />
    </div>
  );
}

export default PatientPage;