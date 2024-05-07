import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PatientEmbedding, PatientPrediction, Shap } from './types';
import { ChartData } from 'chart.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function createShapDataset({ shapBaseValue, shapData, shapValues }: Pick<PatientPrediction, 'shapValues' | 'shapBaseValue' | 'shapData'>) {

  const shaps = Object.entries(shapData).map(([key, value]) => ({ feature: key, value, shapValue: shapValues[key as keyof typeof shapValues] }));
  shaps.sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));

  const labels = shaps.map(s => `${s.value}=${s.feature}`);
  const backgroundColors = shaps.map(s => s.shapValue > 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)');
  const borderColors = shaps.map(s => s.shapValue > 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)');

  const data = createShapDataArray(shapBaseValue, shaps);

  const dataset: ChartData<'bar', [number, number][], string> = {
    labels,
    datasets: [
      {
        data,
        borderColor: borderColors,
        backgroundColor: backgroundColors,
        borderSkipped: false
      }
    ]
  };

  return dataset;
}

export function createEmbeddingDataset(embeddings: PatientEmbedding[]) {

  const embeddingsCopy = embeddings.slice();

  const current = embeddingsCopy.pop()!;
  const currentData = [{ x: current.embedding1, y: current.embedding2 }];
  const noDiabetesData = embeddingsCopy.filter(r => r.outcome === 0).map(r => ({ x: r.embedding1, y: r.embedding2 }));
  const hasDiabetesData = embeddingsCopy.filter(r => r.outcome === 1).map(r => ({ x: r.embedding1, y: r.embedding2 }));

  const dataset: ChartData<'scatter', { x: number, y: number }[], string> = {
    datasets: [
      {
        label: 'Current Patient',
        data: currentData,
        pointStyle: 'rect',
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: current.outcome > 50 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)',
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