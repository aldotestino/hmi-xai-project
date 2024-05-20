from pydantic import BaseModel
import pandas as pd

class Patient(BaseModel):
  pregnancies: int
  glucose: float
  bloodPressure: float
  skinThickness: float
  insulin: float
  bmi: float
  diabetesPedigreeFunction: float
  age: int

  def to_df(self):
    return pd.DataFrame({
      "Pregnancies": [self.pregnancies], 
      "Glucose": [self.glucose], 
      "BloodPressure": [self.bloodPressure], 
      "SkinThickness": [self.skinThickness], 
      "Insulin": [self.insulin], 
      "BMI": [self.bmi], 
      "DiabetesPedigreeFunction": [self.diabetesPedigreeFunction], 
      "Age": [self.age]
    })