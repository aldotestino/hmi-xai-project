'use server';

import db from '@/db';
import { patientPrediction } from '@/db/schema';
import patient from '@/db/schema/patient';
import { ModelApiResult } from '@/lib/types';
import { asc, desc, eq } from 'drizzle-orm';

export async function getPatients() {
  return db.query.patient.findMany({
    orderBy: asc(patient.id)
  });
}

export async function getPatient(id: number) {
  const p = await db.query.patient.findFirst({
    where: eq(patient.id, id),
    with: {
      predictions: {
        orderBy: desc(patientPrediction.createdAt),
      },
    },
  });

  if (!p) {
    throw new Error('Patient not found');
  }

  return {
    ...p,
    predictions: p.predictions.map(({ id, patientId, prediction, createdAt, embeddings, shapBaseValue, shapValues, ...data }) => ({
      id,
      prediction,
      createdAt,
      data,
      shapBaseValue,
      shapValues: shapValues as ModelApiResult['shapValues'],
      embeddings: embeddings as ModelApiResult['embeddings'],
    }))
  };
}