CREATE TABLE IF NOT EXISTS "patient" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"sex" "char" NOT NULL,
	"birth_date" timestamp NOT NULL,
	CONSTRAINT "patient_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient_prediction" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"pregnancies" integer NOT NULL,
	"glucose" integer NOT NULL,
	"blood_pressure" integer NOT NULL,
	"skin_thickness" integer NOT NULL,
	"insulin" integer NOT NULL,
	"bmi" double precision NOT NULL,
	"diabetes_pedigree_function" double precision NOT NULL,
	"age" integer NOT NULL,
	"prediction" double precision NOT NULL,
	"shap_base_value" double precision NOT NULL,
	"shap_values" json NOT NULL,
	"embeddings" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "patient_prediction" ADD CONSTRAINT "patient_prediction_patient_id_patient_id_fk" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
