import { ChartData } from 'chart.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PatientFeatures, PatientPredictionWithData, Shap } from './types';
import trainEmbeddings from './train_embeddings.json';
import { patientFeaturesFields } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDateString(value: string) {
  const [day, month, year] = value.split('/').map(Number);
  return new Date(year, month - 1, day);
};

export function getAge(birthDateString: string): number {

  const birthDate = parseDateString(birthDateString);
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
  return Math.exp(value) / (1 + Math.exp(value)) * 100;
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

  const labels = shaps.map(s => `${patientFeaturesFields[s.feature as keyof PatientFeatures].label} = ${s.value}`);
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

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isSameWeek(date1: Date, date2: Date): boolean {
  const diff = date2.getTime() - date1.getTime();
  const diffDays = diff / (1000 * 3600 * 24);
  return diffDays < 7;
}

function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}

function setupDateFormat(date: Date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    timeZone: 'Europe/Rome',
  };

  const time = date.toLocaleTimeString('it-IT', options);

  return {
    today,
    yesterday,
    time,
  };
}

export function formatDate(date: Date): string {

  const { today, yesterday, time } = setupDateFormat(date);

  if (isSameDay(date, today)) {
    return `Today at ${time}`;
  } else if (isSameDay(date, yesterday)) {
    return `Yesterday at ${time}`;
  } else if (isSameWeek(date, today)) {
    return `${dayNames[date.getDay()]} at ${time}`;
  } else {

    const dayName = dayNames[date.getDay()];

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    if (isSameYear(date, today))
      return `${dayName} ${day} ${month} at ${time}`;

    return `${dayName} ${day} ${month} ${year} at ${time}`;
  }
}