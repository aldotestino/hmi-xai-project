import { PatientFeatureFields } from './types';
import { trunc } from './utils';
import { Bar, Scatter } from 'react-chartjs-2';
import { Color, defaults } from 'chart.js';

export const graphColors = {
  stroke: {
    red: 'rgb(248, 113, 113)',
    blue: 'rgb(96, 165, 250)',
  },
  fill: {
    red: 'rgba(248, 113, 113, 0.5)',
    blue: 'rgba(96, 165, 250, 0.5)',
  }
} as const;

export const patientFeaturesFields: PatientFeatureFields = {
  pregnancies: {
    label: 'Pregnancies',
    description: 'Number of times pregnant',
  },
  glucose: {
    label: 'Glucose',
    description: 'Plasm glucose concentration a 2 hours in an oral glucose tolerance test (mg/dl)',
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

export const barOptions: React.ComponentProps<typeof Bar>['options'] = {
  indexAxis: 'y' as const, // horizontal bar chart
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Risk probability [%]',
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Explanation',
    },
    legend: {
      onClick: () => null,
      labels: {
        generateLabels: () => {
          return [
            {
              fontColor: defaults.color as Color,
              text: 'Decrease Risk',
              strokeStyle: graphColors.stroke.blue,
              fillStyle: graphColors.fill.blue,
            },
            {
              fontColor: defaults.color as Color,
              text: 'Increase Risk',
              strokeStyle: graphColors.stroke.red,
              fillStyle: graphColors.fill.red,
            }
          ];
        }
      }
    },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const values = ctx.dataset.data?.[ctx.dataIndex];
          if (values && typeof (values) === 'object' && values.length === 2) {
            const num = values[1] - values[0];
            return `${num > 0 ? '+' : '-'}${trunc(Math.abs(num), 2).toString()}%`;
          }
        }
      }
    }
  },
};

export const scatterOptions: React.ComponentProps<typeof Scatter>['options'] = {
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
    title: {
      display: true,
      text: 'PCA Embeddings',
    }
  },
};