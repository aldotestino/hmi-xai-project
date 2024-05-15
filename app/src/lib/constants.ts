import { PatientFeatureFields } from './types';
import { trunc } from './utils';

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

export const barOptions = {
  indexAxis: 'y' as const, // horizontal bar chart
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Explanation',
    },
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          const values = ctx.dataset.data?.[ctx.dataIndex];
          if (values && typeof (values) === 'object' && values.length === 2) {
            const num = values[1] - values[0];
            return `${num > 0 ? '+' : '-'}${trunc(Math.abs(num), 2).toString()}`;
          }
        }
      }
    }
  },
};

export const scatterOptions = {
  elements: {
    point: {
      radius: 5,
      hoverRadius: 7
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Embedding 2',
      }
    },
    x: {
      title: {
        display: true,
        text: 'Embedding 1',
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true
    },
    title: {
      display: true,
      text: 'PCA Embeddings',
    }
  },
};