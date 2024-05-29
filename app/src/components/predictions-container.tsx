'use client';

import { PatientPredictionWithData } from '@/lib/types';
import { Inbox } from 'lucide-react';
import Prediction from './prediction';
import { formatDate } from '@/lib/utils';
import { TabsList, TabsTrigger, Tabs, TabsContent } from './ui/tabs';
import { useEffect, useMemo, useState } from 'react';
import { Badge } from './ui/badge';

function PredictionsContainer({ 
  predictions 
}: {
  predictions: PatientPredictionWithData[]
}) {

  const [activeTab, setActiveTab] = useState(predictions[0]?.id.toString() || '0');

  function handleTabChange(tabId: string) {
    setActiveTab(tabId);
  }

  // if a prediction is removed or added, select the latest available
  useEffect(() => {
    if(predictions.length > 0) {
      setActiveTab(predictions[0].id.toString());
    }
  }, [predictions]);

  const latestPredictions = useMemo(() => {
    const now = new Date();

    return predictions.filter((prediction) => {
      const predictionDate = new Date(prediction.createdAt);
      const diff = now.getTime() - predictionDate.getTime();
      return diff < 1000 * 60 * 5;
    }).map((prediction) => prediction.id);
  }, [predictions]);

  if(predictions.length === 0) {
    return (
      <main className="flex items-center justify-center flex-col text-muted-foreground gap-2">
        <Inbox size={50} />
        <p className='font-semibold text-center'>Fill out the form to get started...</p>
      </main>
    );
  }

  return (
    <Tabs 
      className='grid grid-cols-[auto,1fr] overflow-y-hidden' 
      defaultValue={predictions[0]?.id.toString()} 
      value={activeTab} 
      onValueChange={handleTabChange} 
      orientation='vertical'
    >
      <TabsList className='flex-col h-full justify-start rounded-none p-2 w-60 overflow-y-auto'>
        {predictions.map((prediction) => (
          <TabsTrigger 
            key={prediction.id} 
            value={prediction.id.toString()} 
            className='p-4 w-full justify-between items-center rounded-md'>
            <p className='min-w-0 truncate'>{formatDate(prediction.createdAt)}</p>
            {latestPredictions.includes(prediction.id) && (
              <Badge>New</Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
      {predictions.map((prediction) => (
        <TabsContent key={prediction.id} value={prediction.id.toString()} className='p-4 m-0 overflow-x-hidden'>
          <Prediction prediction={prediction} />
        </TabsContent>  
      ))}
    </Tabs>
  );
}

export default PredictionsContainer;