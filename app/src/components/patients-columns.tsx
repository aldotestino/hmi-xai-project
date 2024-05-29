'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import PatientActions from './patient-actions';
import { Patient } from '@/db/schema/patient';

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <Link href={`/patient/${patient.id}`} className={buttonVariants({ variant: 'link' })}>
          {patient.id}
        </Link>
      );
    },
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'sex',
    header: 'Sex',
  },
  {
    accessorKey: 'birthDate',
    header: 'Birth Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <PatientActions patient={row.original} />,
  },
];