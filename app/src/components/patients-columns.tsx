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
    header: 'Nome',
  },
  {
    accessorKey: 'lastName',
    header: 'Cognome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'sex',
    header: 'Sesso',
  },
  {
    accessorKey: 'birthDate',
    header: 'Data di nascita',
    cell: ({ row }) => new Date(row.original.birthDate).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  },
  {
    id: 'actions',
    cell: ({ row }) => <PatientActions patient={row.original} />,
  },
];