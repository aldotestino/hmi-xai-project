import { z } from 'zod';

export const patientInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  sex: z.enum(['M', 'F']),
  birthDate: z.date()
});

export type PatientInput = z.infer<typeof patientInputSchema>;