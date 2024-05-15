'use client';

import { PatientPredictionWithData } from '@/lib/types';
import React from 'react';
import PatientFeaturesTable from './patient-features-table';
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { formatDate } from '@/lib/utils';
import Embedddings from './embeddings';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip, PointElement, Legend } from 'chart.js';
import Shap from './shap';
import DeletePredictionAlert from './delete-prediction-alert';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  PointElement,
  Legend
);

function Prediction({ 
  prediction 
}: {
  prediction: PatientPredictionWithData
}) {
  
  return (
    <AccordionItem value={prediction.id.toString()}>
      <AccordionTrigger className='p-4'>{formatDate(prediction.createdAt)}</AccordionTrigger>
      <AccordionContent className='p-4'>
        <div className='space-y-4'>
          <PatientFeaturesTable data={prediction.data} prediction={prediction.prediction} />
          <Embedddings embeddings={prediction.embeddings} prediction={prediction.prediction} />
          <Shap shapBaseValue={prediction.shapBaseValue} shapValues={prediction.shapValues} data={prediction.data} /> 
          <div className='text-right'>
            <DeletePredictionAlert predictionId={prediction.id} />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default Prediction;