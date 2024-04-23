import * as z from 'zod';

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

export type PatientPrediction = {
  prediction: number;
  shapBaseValue: number;
  shapData: {
    [key in keyof Patient]: number;
  },
  shapValues: {
    [key in keyof Patient]: number;
  }
}

export type PatientFields = {
  [key in keyof Patient]: {
    label: string;
    description?: string;
  }
}