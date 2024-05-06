import * as z from 'zod';
import { CoreChartOptions, ElementChartOptions, PluginChartOptions, DatasetChartOptions, ScaleChartOptions, BarControllerChartOptions, ChartTypeRegistry } from 'chart.js';
import { _DeepPartialObject } from 'node_modules/chart.js/dist/types/utils';

export const patientSchema = z.object({
  pregnancies: z.coerce.number().min(0),
  glucose: z.coerce.number().min(0),
  bloodPressure: z.coerce.number().min(0),
  skinThickness: z.coerce.number().min(0),
  insulin: z.coerce.number().min(0),
  bmi: z.coerce.number().min(0),
  diabetesPedigreeFunction: z.coerce.number().min(0),
  age: z.coerce.number().min(0),
});

export type Patient = z.infer<typeof patientSchema>;

export type PatientEmbedding = {
  embedding1: number;
  embedding2: number;
  outcome: number;
}

export type PatientPrediction = {
  id: string;
  prediction: number;
  shapBaseValue: number;
  shapData: {
    [key in keyof Patient]: number;
  };
  shapValues: {
    [key in keyof Patient]: number;
  };
  embeddings: PatientEmbedding[]
}

export type PatientFields = {
  [key in keyof Patient]: {
    label: string;
    description?: string;
  }
}

export type Shap = {
  feature: string;
  value: number;
  shapValue: number;
}

export type typeChartOptions<TType extends keyof ChartTypeRegistry> = _DeepPartialObject<CoreChartOptions<TType> & ElementChartOptions<TType> & PluginChartOptions<TType> & DatasetChartOptions<TType> & ScaleChartOptions<TType> & BarControllerChartOptions>