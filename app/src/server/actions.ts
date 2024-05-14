'use server';

import db from '@/db';
import { patient } from '@/db/schema';
import { PatientInput, patientInputSchema } from '@/lib/types';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function addPatient(patientInput: PatientInput) {
  const { success, data, error } = patientInputSchema.safeParse(patientInput);

  if (!success) {
    throw new Error(JSON.stringify(error));
  }

  await db.insert(patient).values(data);

  revalidatePath('/');
}

export async function updatePatient(id: number, patientInput: PatientInput) {
  const { success, data, error } = patientInputSchema.safeParse(patientInput);

  if (!success) {
    throw new Error(JSON.stringify(error));
  }

  await db.update(patient).set(data).where(eq(patient.id, id));

  revalidatePath('/');
}

export async function deletePatient(id: number) {
  await db.delete(patient).where(eq(patient.id, id));

  revalidatePath('/');
}