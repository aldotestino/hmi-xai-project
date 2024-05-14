import { PatientInput } from '@/lib/types';

type Patient = PatientInput & { id: number };

const patients: Patient[] = [
  {
    'id': 1,
    'firstName': 'John',
    'lastName': 'Doe',
    'email': 'john.doe@gmail.com',
    'sex': 'M',
    'birthDate': '01/01/1990'
  },
  {
    'id': 2,
    'firstName': 'Jane',
    'lastName': 'Smith',
    'email': 'jane.smith@example.com',
    'sex': 'F',
    'birthDate': '15/05/1985'
  },
  {
    'id': 3,
    'firstName': 'Michael',
    'lastName': 'Johnson',
    'email': 'michael.johnson@example.com',
    'sex': 'M',
    'birthDate': '30/11/1988'
  },
  {
    'id': 4,
    'firstName': 'Emily',
    'lastName': 'Brown',
    'email': 'emily.brown@example.com',
    'sex': 'F',
    'birthDate': '20/07/1992'
  }
];


export async function getPatients() {
  return patients;
}