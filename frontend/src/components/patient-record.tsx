import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PatientPrediction } from '@/lib/types';

function PatientRecord(props: PatientPrediction['shapData']) {
  return (
    <div className='bg-white rounded-xl shadow-md border'>
      <Table>
        <TableHeader>
          <TableRow className='divide-x'>
            {Object.keys(props).map(key => (
              <TableHead key={key} className='font-semibold capitalize  '>{key}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className='divide-x'>
            {Object.values(props).map(value => (
              <TableCell className='max-w-20' key={value}>{value}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default PatientRecord;