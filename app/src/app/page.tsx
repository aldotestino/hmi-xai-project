import { columns } from '@/components/patients-columns';
import { PatientsDataTable, } from '@/components/patients-data-table';
import { PatientInput } from '@/lib/types';

type Patient = PatientInput & { id: number };

const patients: Patient[] = [
  {
    'id': 1,
    'firstName': 'John',
    'lastName': 'Doe',
    'email': 'john.doe@gmail.com',
    'sex': 'M',
    'birthDate': '1990-01-01'
  },
  {
    'id': 2,
    'firstName': 'Jane',
    'lastName': 'Smith',
    'email': 'jane.smith@example.com',
    'sex': 'F',
    'birthDate': '1985-05-15'
  },
  {
    'id': 3,
    'firstName': 'Michael',
    'lastName': 'Johnson',
    'email': 'michael.johnson@example.com',
    'sex': 'M',
    'birthDate': '1988-11-30'
  },
  {
    'id': 4,
    'firstName': 'Emily',
    'lastName': 'Brown',
    'email': 'emily.brown@example.com',
    'sex': 'F',
    'birthDate': '1992-07-20'
  },
  {
    'id': 5,
    'firstName': 'David',
    'lastName': 'Wilson',
    'email': 'david.wilson@example.com',
    'sex': 'M',
    'birthDate': '1983-03-10'
  },
  {
    'id': 6,
    'firstName': 'Sarah',
    'lastName': 'Jones',
    'email': 'sarah.jones@example.com',
    'sex': 'F',
    'birthDate': '1995-09-25'
  },
  {
    'id': 7,
    'firstName': 'James',
    'lastName': 'Taylor',
    'email': 'james.taylor@example.com',
    'sex': 'M',
    'birthDate': '1980-12-05'
  },
  {
    'id': 8,
    'firstName': 'Emma',
    'lastName': 'Anderson',
    'email': 'emma.anderson@example.com',
    'sex': 'F',
    'birthDate': '1998-04-12'
  },
  {
    'id': 9,
    'firstName': 'Christopher',
    'lastName': 'Martinez',
    'email': 'christopher.martinez@example.com',
    'sex': 'M',
    'birthDate': '1987-06-18'
  },
  {
    'id': 10,
    'firstName': 'Olivia',
    'lastName': 'Garcia',
    'email': 'olivia.garcia@example.com',
    'sex': 'F',
    'birthDate': '1993-10-08'
  }
];

export default function Home() {
  return (
    <main className="container w-full max-w-screen-lg py-20 space-y-10">
      <header>
        <h1 className='text-4xl font-semibold'>Pazienti</h1>
      </header>
      <PatientsDataTable columns={columns} data={patients} />
    </main>
  );
}
