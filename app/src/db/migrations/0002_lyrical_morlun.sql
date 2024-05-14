CREATE TABLE IF NOT EXISTS "patientPrediction" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"pregnancies" integer NOT NULL,
	"glucose" integer NOT NULL,
	"blood_pressure" integer NOT NULL,
	"skin_thickness" integer NOT NULL,
	"insulin" integer NOT NULL,
	"bmi" numeric NOT NULL,
	"diabetes_pedigree_function" numeric NOT NULL,
	"age" integer NOT NULL,
	"prediction" numeric NOT NULL,
	"shap_base_value" numeric NOT NULL,
	"shap_values" json NOT NULL,
	"embeddings" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patientPrediction" ADD CONSTRAINT "patientPrediction_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
