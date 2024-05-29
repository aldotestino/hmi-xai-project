import { PatientFeatureFields, PatientFeatures } from '@/lib/types';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn, trunc } from '@/lib/utils';
import { patientFeaturesFields } from '@/lib/constants';

function PatientFeaturesTable({
  data,
  prediction
}: {
  data: PatientFeatures,
  prediction: number
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(data).map(key => (
              <TableHead key={key}>{patientFeaturesFields[key as keyof PatientFeatureFields].label}</TableHead>
            ))}
            <TableHead>Risk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {Object.entries(data).map(([key, value]) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
            <TableCell className={cn('font-semibold text-blue-400', prediction > 50 && 'text-red-400')}>{trunc(prediction, 2)}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default PatientFeaturesTable;