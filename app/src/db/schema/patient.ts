import { pgTable, serial, text, timestamp, varchar, } from 'drizzle-orm/pg-core';

const patient = pgTable('patient', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').unique().notNull(),
  sex: varchar('sex', { length: 1 }).notNull(),
  birthDate: timestamp('birth_date').notNull(),
});

export default patient;

export type Patient = typeof patient.$inferSelect;