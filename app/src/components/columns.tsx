'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { MoreHorizontal, SquarePen, Trash2 } from 'lucide-react';

export type Patient = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
  birthDate: string;
};

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const patient = row.original;

      return (
        <Link href={`/patients/${patient.id}`} className={buttonVariants({ variant: 'link' })}>
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
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const patient = row.original;
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Apri menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Azioni</DropdownMenuLabel>
            <DropdownMenuItem>
              <SquarePen className="mr-2 h-4 w-4" />
              <span>Aggiorna</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Elimina</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];