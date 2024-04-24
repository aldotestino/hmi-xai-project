import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PatientPrediction } from './types';
import { ChartData } from 'chart.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createDataset({ shapData, shapValues }: Pick<PatientPrediction, 'shapValues' | 'shapBaseValue' | 'shapData'>) {
  const shap = Object.entries(shapData).map(([key, value]) => ({ feature: key, value, shapValue: parseFloat(shapValues[key as keyof typeof shapValues].toFixed(2)) }));
  shap.sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));

  const labels = shap.map(s => `${s.value}=${s.feature}`);

  const backgroundColors = shap.map(s => s.shapValue > 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)');
  const borderColors = shap.map(s => s.shapValue > 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)');

  const data: ChartData<'bar', number[], string> = {
    labels,
    datasets: [
      {
        data: shap.map(s => s.shapValue),
        borderColor: borderColors,
        backgroundColor: backgroundColors,
      }
    ]
  };

  return data;
}