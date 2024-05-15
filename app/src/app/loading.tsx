import Spinner from '@/components/ui/spinner';
import React from 'react';

function HomeLoading() {
  return (
    <main className="container w-full max-w-screen-lg py-20 space-y-10">
      <header>
        <h1 className='text-4xl font-semibold'>Pazienti</h1>
      </header>
      <div className='flex items-center justify-center gap-2 text-muted-foreground'>
        <Spinner className='w-6 h-6' />
        <p>Carico informazioni sui pazienti...</p>
      </div>
    </main>
  );
}

export default HomeLoading;