import { z } from 'zod';

export const patientInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  sex: z.string().length(1).refine(value => ['M', 'F'].includes(value)),
  birthDate: z.date()
});

export const patientFeaturesSchema = z.object({
  pregnancies: z.coerce.number().min(0),
  glucose: z.coerce.number().min(0),
  bloodPressure: z.coerce.number().min(0),
  skinThickness: z.coerce.number().min(0),
  insulin: z.coerce.number().min(0),
  bmi: z.coerce.number().min(0),
  diabetesPedigreeFunction: z.coerce.number().min(0),
  age: z.coerce.number().min(0),
});


export type PatientInput = z.infer<typeof patientInputSchema>;
export type PatientFeatures = z.infer<typeof patientFeaturesSchema>;

export type PatientFeatureFields = {
  [key in keyof PatientFeatures]: {
    label: string;
    description?: string;
  }
}