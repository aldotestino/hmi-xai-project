'use server';

import db from '@/db';

export async function getPatients() {
  return db.query.patient.findMany();
}