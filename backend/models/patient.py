from pydantic import BaseModel
import pandas as pd

class Patient(BaseModel):
  Pregnancies: int
  Glucose: int
  BloodPressure: int
  SkinThickness: int
  Insulin: int
  BMI: float
  DiabetesPedigreeFunction: float
  Age: int

  def to_df(self):
    return pd.DataFrame({
      "Pregnancies": [self.Pregnancies], 
      "Glucose": [self.Glucose], 
      "BloodPressure": [self.BloodPressure], 
      "SkinThickness": [self.SkinThickness], 
      "Insulin": [self.Insulin], 
      "BMI": [self.BMI], 
      "DiabetesPedigreeFunction": [self.DiabetesPedigreeFunction], 
      "Age": [self.Age]
    })