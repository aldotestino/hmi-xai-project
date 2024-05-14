CREATE TABLE IF NOT EXISTS "patient" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"email" text,
	"sex" varchar(1),
	"birth_date" timestamp,
	CONSTRAINT "patient_email_unique" UNIQUE("email")
);
