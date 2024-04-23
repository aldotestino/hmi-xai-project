from xgboost import XGBClassifier
from shap import Explainer
import joblib

class ShapModel:
  def __init__(self):
    self.model: XGBClassifier = joblib.load("model.joblib")
    self.explainer: Explainer = Explainer(self.model)

  def predict_with_shap(self, X):
    prediction = round(self.model.predict_proba(X)[0][1] * 100, ndigits=2)
    shap_values = self.explainer(X)
    return prediction, shap_values