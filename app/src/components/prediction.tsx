import { PatientPredictionWithData } from '@/lib/types';
import React from 'react';
import PatientFeaturesTable from './patient-features-table';

function Prediction({ 
  prediction 
}: {
  prediction: PatientPredictionWithData
}) {
  
  return (
    <div className='space-y-4 w-full py-4 lg:py-6 overflow-x-hidden'>
      <PatientFeaturesTable data={prediction.data} prediction={prediction.prediction} />
      {/* <Embedddings embeddings={embeddings} />
      <Shap shapBaseValue={shapBaseValue} shapValues={shapValues} shapData={shapData} /> */}
    </div>
  );
}

export default Prediction;