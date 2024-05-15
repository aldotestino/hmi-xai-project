import { PatientPredictionWithData } from '@/lib/types';
import React from 'react';
import PatientFeaturesTable from './patient-features-table';
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { formatDate } from '@/lib/utils';

function Prediction({ 
  prediction 
}: {
  prediction: PatientPredictionWithData
}) {
  
  return (
    <AccordionItem value={prediction.id.toString()}>
      <AccordionTrigger>{formatDate(prediction.createdAt)}</AccordionTrigger>
      <AccordionContent>
        <div className='space-y-4 w-full py-4 lg:py-6 overflow-x-hidden'>
          <PatientFeaturesTable data={prediction.data} prediction={prediction.prediction} />
          {/* <Embedddings embeddings={embeddings} />
              <Shap shapBaseValue={shapBaseValue} shapValues={shapValues} shapData={shapData} /> 
          */}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default Prediction;