import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Patient, PatientPrediction } from './types';

const client = axios.create({
  baseURL: 'http://localhost:8080',
});

export async function predict(values: Patient) {
  const { data }: { data: PatientPrediction } = await client.post('/predict', values);
  return data;
}

export const queryClient = new QueryClient();
