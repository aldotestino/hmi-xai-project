import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PatientPrediction } from '@/lib/types';
import { cn, trunc } from '@/lib/utils';

interface PatientRecordProps {
  shapData: PatientPrediction['shapData'];
  prediction: PatientPrediction['prediction'];
}

function PatientRecord({ shapData, prediction }: PatientRecordProps) {
  return (
    <div className='bg-white w-full rounded-xl shadow-md border'>
      <Table>
        <TableHeader>
          <TableRow className='divide-x'>
            {Object.keys(shapData).map(key => (
              <TableHead key={key} className='font-semibold capitalize'>{key}</TableHead>
            ))}
            <TableHead className='font-semibold'>Risk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className='divide-x'>
            {Object.values(shapData).map(value => (
              <TableCell className='max-w-20' key={value}>{value}</TableCell>
            ))}
            <TableCell className={cn('max-w-20 font-semibold text-green-500', prediction > 50 && 'text-red-500')}>{trunc(prediction, 1)}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default PatientRecord;