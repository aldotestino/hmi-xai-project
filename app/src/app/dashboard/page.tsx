import { columns } from '@/components/patients-columns';
import { PatientsDataTable, } from '@/components/patients-data-table';
import { getPatients } from '@/server/queries';

async function Dashboard() {

  const patients = await getPatients();

  return (
    <main className="container w-full max-w-screen-lg py-20 space-y-10">
      <header>
        <h1 className='text-4xl font-semibold'>Patients</h1>
      </header>
      <PatientsDataTable columns={columns} data={patients} />
    </main>
  );
}

export default Dashboard;