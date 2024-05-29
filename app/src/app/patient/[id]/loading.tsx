import Spinner from '@/components/ui/spinner';
import React from 'react';

function PatientPageLoading() {
  return (
    <div className='h-screen flex items-center justify-center gap-2 text-muted-foreground'>
      <Spinner className='w-6 h-6' />
      <p>Loading patient information...</p>
    </div>
  );
}

export default PatientPageLoading;