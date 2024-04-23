import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Patient, PatientPrediction } from './types';

const client = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string
});

export async function predict(values: Patient) {
  const { data }: { data: PatientPrediction } = await client.post('/predict', values);
  return data;
}

export const queryClient = new QueryClient();
