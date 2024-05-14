import { pgTable, serial, text, timestamp, varchar, } from 'drizzle-orm/pg-core';

const patient = pgTable('patient', {
  id: serial('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email').unique(),
  sex: varchar('sex', { length: 1 }),
  birthDate: timestamp('birth_date'),
});

export default patient;