import PatientSidebar from '@/components/patient-sidebar';
import React from 'react';

async function PatientPage({ params }: {params: {id: number}}) {
  return (
    <div className='h-screen'>
      <PatientSidebar />
    </div>
  );
}

export default PatientPage;