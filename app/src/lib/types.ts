import { z } from 'zod';

export const patientInputSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  sex: z.enum(['M', 'F']),
  birthDate: z.string().regex(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/)
});

export type PatientInput = z.infer<typeof patientInputSchema>;