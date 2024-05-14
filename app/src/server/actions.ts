'use server';

import db from '@/db';
import axios from 'axios';
import { patient, patientPrediction } from '@/db/schema';
import { ModelApiResult, PatientFeatures, PatientInput, patientFeaturesSchema, patientInputSchema } from '@/lib/types';
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

export async function predictAndExplain(id: number, patientFeatures: PatientFeatures) {
  const { success, data, error } = patientFeaturesSchema.safeParse(patientFeatures);

  if (!success) {
    throw new Error(JSON.stringify(error));
  }

  const { data: predictionData }: { data: ModelApiResult } = await axios.post('http://localhost:8080/predict', patientFeatures);

  await db.insert(patientPrediction).values({
    patientId: id,
    pregnancies: data.pregnancies,
    glucose: data.glucose,
    bloodPressure: data.bloodPressure,
    skinThickness: data.skinThickness,
    insulin: data.insulin,
    bmi: data.bmi,
    diabetesPedigreeFunction: data.diabetesPedigreeFunction,
    age: data.age,
    prediction: predictionData.prediction,
    shapBaseValue: predictionData.shapBaseValue,
    shapValues: predictionData.shapValues,
    embeddings: predictionData.embeddings
  });

  revalidatePath(`/patient/${id}`);
}