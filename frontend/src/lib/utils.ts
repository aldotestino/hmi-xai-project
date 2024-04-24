import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PatientPrediction, Shap } from './types';
import { ChartData } from 'chart.js';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trunc(num: number, digits: number) {
  const factor = Math.pow(10, digits);
  return Math.round(num * factor) / factor;
}

function createData(shapBaseValue: number, shaps: Shap[]) {
  const revShaps = [...shaps].reverse();
  const data: [number, number][] = [];
  data[0] = [shapBaseValue, shapBaseValue + revShaps[0].shapValue];

  for (let i = 1; i < shaps.length; i++) {
    data.push([data[i - 1][1], data[i - 1][1] + revShaps[i].shapValue]);
  }

  data.reverse();
  return data;
}

export function createDataset({ shapBaseValue, shapData, shapValues }: Pick<PatientPrediction, 'shapValues' | 'shapBaseValue' | 'shapData'>) {

  const shaps = Object.entries(shapData).map(([key, value]) => ({ feature: key, value, shapValue: shapValues[key as keyof typeof shapValues] }));
  shaps.sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));

  const labels = shaps.map(s => `${s.value}=${s.feature}`);
  const backgroundColors = shaps.map(s => s.shapValue > 0 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)');
  const borderColors = shaps.map(s => s.shapValue > 0 ? 'rgb(255, 99, 132)' : 'rgb(54, 162, 235)');

  const data = createData(shapBaseValue, shaps);

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