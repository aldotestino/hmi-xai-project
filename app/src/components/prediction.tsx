'use client';

import { PatientPredictionWithData } from '@/lib/types';
import React from 'react';
import PatientFeaturesTable from './patient-features-table';
import { AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { formatDate } from '@/lib/utils';
import Embedddings from './embeddings';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip, PointElement, Legend } from 'chart.js';
import Shap from './shap';

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
      <AccordionTrigger>{formatDate(prediction.createdAt)}</AccordionTrigger>
      <AccordionContent>
        <div className='space-y-4'>
          <PatientFeaturesTable data={prediction.data} prediction={prediction.prediction} />
          <Embedddings embeddings={prediction.embeddings} prediction={prediction.prediction} />
          <Shap shapBaseValue={prediction.shapBaseValue} shapValues={prediction.shapValues} data={prediction.data} /> 
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

export default Prediction;