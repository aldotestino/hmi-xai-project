import PatientSidebar from '@/components/patient-sidebar';
import { getPatient } from '@/server/queries';
import React from 'react';

async function PatientPage({ params }: {params: {id: number}}) {

  const { predictions, ...patient } = await getPatient(params.id);

  return (
    <div className='h-screen'>
      <PatientSidebar patient={patient}  />
    </div>
  );
}

export default PatientPage;