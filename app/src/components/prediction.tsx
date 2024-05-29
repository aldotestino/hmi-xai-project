'use client';

import { PatientPredictionWithData } from '@/lib/types';
import React from 'react';
import PatientFeaturesTable from './patient-features-table';
import Embedddings from './embeddings';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip, PointElement, Legend } from 'chart.js';
import Shap from './shap';
import DeletePredictionAlert from './delete-prediction-alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className='space-y-4'>
      <PatientFeaturesTable data={prediction.data} prediction={prediction.prediction} />
      <Tabs defaultValue="embeddings">
        <div className='flex justify-between w-full items-center'>
          <p className='text-lg font-semibold text-muted-foreground'>Select visualization</p>
          <TabsList>
            <TabsTrigger value="embeddings">PCA Embeddings</TabsTrigger>
            <TabsTrigger value="shap">Explanation</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="embeddings">
          <Embedddings embeddings={prediction.embeddings} prediction={prediction.prediction} />
        </TabsContent>
        <TabsContent value="shap">
          <Shap shapBaseValue={prediction.shapBaseValue} shapValues={prediction.shapValues} data={prediction.data} /> 
        </TabsContent>
      </Tabs>
      <div className='text-right'>
        <DeletePredictionAlert predictionId={prediction.id} />
      </div>
    </div>
  );
}

export default Prediction;