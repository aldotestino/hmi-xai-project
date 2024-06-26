import { pgTable, serial, integer, timestamp, json, doublePrecision } from 'drizzle-orm/pg-core';
import patient from './patient';
import { relations } from 'drizzle-orm';

const patientPrediction = pgTable('patient_prediction', {
  id: serial('id').primaryKey(),
  patientId: integer('patient_id').references(() => patient.id, { onDelete: 'cascade' }).notNull(),
  pregnancies: integer('pregnancies').notNull(),
  glucose: doublePrecision('glucose').notNull(),
  bloodPressure: doublePrecision('blood_pressure').notNull(),
  skinThickness: doublePrecision('skin_thickness').notNull(),
  insulin: doublePrecision('insulin').notNull(),
  bmi: doublePrecision('bmi').notNull(),
  diabetesPedigreeFunction: doublePrecision('diabetes_pedigree_function').notNull(),
  age: integer('age').notNull(),
  prediction: doublePrecision('prediction').notNull(),
  shapBaseValue: doublePrecision('shap_base_value').notNull(),
  shapValues: json('shap_values').notNull(),
  embeddings: json('embeddings').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

export const patientPredictionRelations = relations(patientPrediction, ({ one }) => ({
  patient: one(patient, {
    fields: [patientPrediction.patientId],
    references: [patient.id]
  })
}));

export default patientPrediction;
export type PatientPrediction = typeof patientPrediction.$inferSelect;