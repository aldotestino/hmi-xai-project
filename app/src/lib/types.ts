import { z } from 'zod';

export const patientInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  sex: z.string().length(1).refine(value => ['M', 'F'].includes(value)),
  birthDate: z.date()
});

export type PatientInput = z.infer<typeof patientInputSchema>;