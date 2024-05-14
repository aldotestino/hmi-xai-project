'use server';

import db from '@/db';
import patient from '@/db/schema/patient';
import { asc } from 'drizzle-orm';

export async function getPatients() {
  return db.query.patient.findMany({
    orderBy: asc(patient.id)
  });
}