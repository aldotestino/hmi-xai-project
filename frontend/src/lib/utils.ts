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

export function createTsneDataset(embeddings: PatientEmbedding[]) {

  const data = embeddings.map(r => ({ x: r.embedding1, y: r.embedding2 }));

  const backgroundColors = embeddings.map(r => r.outcome === 1 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)') as string[];
  const borderColors = embeddings.map(r => r.outcome === 1 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)') as string[];

  backgroundColors[backgroundColors.length - 1] = embeddings.at(-1)!.outcome > 50 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)';
  borderColors[borderColors.length - 1] = 'rgb(0, 0, 0)';

  const pointStyles = Array.from({ length: embeddings.length }, (_, i) => i === embeddings.length - 1 ? 'rect' : 'circle');
  const pointRadiuses = Array.from({ length: embeddings.length }, (_, i) => i === embeddings.length - 1 ? 12 : 5);
  const pointHoverRadiuses = Array.from({ length: embeddings.length }, (_, i) => i === embeddings.length - 1 ? 14 : 7);
  const pointBorderWidths = Array.from({ length: embeddings.length }, (_, i) => i === embeddings.length - 1 ? 4 : 1);
  const pointHoverBorderWidths = Array.from({ length: embeddings.length }, (_, i) => i === embeddings.length - 1 ? 4 : 1);

  const dataset: ChartData<'scatter', { x: number, y: number }[], string> = {
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        pointStyle: pointStyles,
        pointRadius: pointRadiuses,
        pointHoverRadius: pointHoverRadiuses,
        pointBorderWidth: pointBorderWidths,
        pointHoverBorderWidth: pointHoverBorderWidths,
      }
    ]
  };

  return dataset;
}