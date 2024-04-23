import { useMutation } from '@tanstack/react-query';
import PredictionsContainer from './components/predictions-container';
import Sidebar from './components/sidebar';
import { predict } from './lib/api';
import { useState } from 'react';
import { PatientPrediction } from './lib/types';

function App() {

  const [predictions, setPredictions] = useState<PatientPrediction[]>([]);

  const predictMutation = useMutation({
    mutationFn: predict,
    onSuccess: (data) => {
      setPredictions(prev => [data, ...prev]);
    }
  });

  return (
    <div className="h-screen grid grid-cols-[auto,1fr] overflow-y-hidden">
      <Sidebar onFormSubmit={predictMutation.mutateAsync} isFormLoading={predictMutation.isPending} />
      <PredictionsContainer predictions={predictions} />
    </div>
  );
}

export default App;
