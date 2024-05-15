import { ChartData } from 'chart.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PatientPredictionWithData, Shap } from './types';
import trainEmbeddings from './train_embeddings.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAge(birthDate: Date): number {
  const today: Date = new Date();

  const ageDiffMillis: number = today.getTime() - birthDate.getTime();

  const ageDate: Date = new Date(ageDiffMillis);
  const age: number = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age;
}

export function trunc(num: number, digits: number) {
  const factor = Math.pow(10, digits);
  return Math.round(num * factor) / factor;
}

function toProb(value: number) {
  return Math.exp(value) / (1 + Math.exp(value));
}

function createShapDataArray(shapBaseValue: number, shaps: Shap[]) {
  const revShaps = [...shaps].reverse();
  const data: [number, number][] = [];
  data[0] = [shapBaseValue, shapBaseValue + revShaps[0].shapValue];

  for (let i = 1; i < shaps.length; i++) {
    data.push([data[i - 1][1], data[i - 1][1] + revShaps[i].shapValue]);
  }

  data.reverse();
  const dataProbs = data.map(([start, end]) => [toProb(start), toProb(end)]) as [number, number][];
  return dataProbs;
}

export function createShapDataset({ shapBaseValue, data, shapValues }: Pick<PatientPredictionWithData, 'shapValues' | 'shapBaseValue' | 'data'>) {

  const shaps = Object.entries(data).map(([key, value]) => ({ feature: key, value, shapValue: shapValues[key as keyof typeof shapValues] }));
  shaps.sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));

  const labels = shaps.map(s => `${s.value}=${s.feature}`);
  const backgroundColors = shaps.map(s => s.shapValue > 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)');
  const borderColors = shaps.map(s => s.shapValue > 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)');

  const shapData = createShapDataArray(shapBaseValue, shaps);

  const dataset: ChartData<'bar', [number, number][], string> = {
    labels,
    datasets: [
      {
        data: shapData,
        borderColor: borderColors,
        backgroundColor: backgroundColors,
        borderSkipped: false
      }
    ]
  };

  return dataset;
}

export function createEmbeddingDataset(embeddings: PatientPredictionWithData['embeddings'], prediction: number) {

  const currentData = [{ x: embeddings.embedding1, y: embeddings.embedding2 }];
  const noDiabetesData = trainEmbeddings['0'];
  const hasDiabetesData = trainEmbeddings['1'];

  const dataset: ChartData<'scatter', { x: number, y: number }[], string> = {
    datasets: [
      {
        label: 'Current Patient',
        data: currentData,
        pointStyle: 'rect',
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: prediction > 50 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)',
        pointRadius: 12,
        pointHoverRadius: 14,
        pointBorderWidth: 4,
        pointHoverBorderWidth: 4,
      }, {
        label: 'No Diabetes',
        data: noDiabetesData,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      }, {
        label: 'Has Diabetes',
        data: hasDiabetesData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  };

  return dataset;
}