import * as z from 'zod';

export const patientSchema = z.object({
  age: z.coerce.number().min(0),
  glucose: z.coerce.number().min(0),
  insulin: z.coerce.number().min(0),
  skinThickness: z.coerce.number().min(0),
  bmi: z.coerce.number().min(0),
  dpf: z.coerce.number().min(0),
  bloodPressure: z.coerce.number().min(0),
  pregnancies: z.coerce.number().min(0),
});

export type Patient = z.infer<typeof patientSchema>;