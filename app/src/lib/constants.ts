import { PatientFeatureFields } from './types';

export const patientFeaturesFields: PatientFeatureFields = {
  pregnancies: {
    label: 'Pregnancies',
    description: 'Number of times pregnant',
  },
  glucose: {
    label: 'Glucose',
    description: 'Plasma glucose concentration a 2 hours in an oral glucose tolerance test',
  },
  bloodPressure: {
    label: 'Blood Pressure',
    description: 'Diastolic blood pressure (mm Hg)',
  },
  skinThickness: {
    label: 'Skin Thickness',
    description: 'Triceps skin fold thickness (mm)',
  },
  insulin: {
    label: 'Insulin',
    description: '2-Hour serum insulin (mu U/ml)',
  },
  bmi: {
    label: 'BMI',
    description: 'Body mass index (weight in kg/(height in m)^2)',
  },
  diabetesPedigreeFunction: {
    label: 'Diabetes Pedigree Function',
  },
  age: {
    label: 'Age',
  },
} as const;