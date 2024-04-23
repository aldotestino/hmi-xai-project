import { Inbox } from 'lucide-react';

function main() {
  return (
    <main className="flex flex-col items-center justify-center gap-2 text-slate-500">
      <Inbox size={50} />
      <p className='text-lg font-semibold text-center'>Compile the form on the right to start...</p>
    </main>
  );
}

export default main;