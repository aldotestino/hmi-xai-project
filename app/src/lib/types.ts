import { z } from 'zod';

export const patientInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  sex: z.enum(['M', 'F']),
  birthDate: z.date()
});

export const patientFeaturesSchema = z.object({
  pregnancies: z.coerce.number().min(0),
  glucose: z.coerce.number().min(44).max(197),
  bloodPressure: z.coerce.number().min(44).max(104),
  skinThickness: z.coerce.number().min(15).max(42),
  insulin: z.coerce.number().min(71).max(205),
  bmi: z.coerce.number().min(18).max(50),
  diabetesPedigreeFunction: z.coerce.number().min(0).max(2),
  age: z.coerce.number().min(0).max(120),
});


export type PatientInput = z.infer<typeof patientInputSchema>;
export type PatientFeatures = z.infer<typeof patientFeaturesSchema>;

export type PatientFeatureFields = {
  [key in keyof PatientFeatures]: {
    label: string;
    description?: string;
  }
}

export type ModelApiResult = {
  prediction: number;
  shapBaseValue: number;
  shapValues: {
    [key in keyof PatientFeatures]: number;
  };
  embeddings: {
    embedding1: number,
    embedding2: number
  }
}

export type PatientPredictionWithData = ModelApiResult & {
  id: number;
  createdAt: Date,
  data: PatientFeatures;
}
export type Shap = {
  feature: string;
  value: number;
  shapValue: number;
}