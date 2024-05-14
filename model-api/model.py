import json
import os
from xgboost import XGBClassifier
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from shap import Explainer
import joblib

class Model:
  def __init__(self):

    dirname = os.path.dirname(__file__)
    model_path = os.path.join(dirname, './data/model.joblib')
    scaler_path = os.path.join(dirname, './data/scaler.joblib')
    pca_path = os.path.join(dirname, './data/pca.joblib')

    self.model: XGBClassifier = joblib.load(model_path)
    self.scaler: StandardScaler = joblib.load(scaler_path)
    self.pca: PCA = joblib.load(pca_path)

    self.explainer: Explainer = Explainer(self.model)

  def create_pca_embeddings(self, X):
    # scale X
    X_scaled = self.scaler.transform(X)
    # apply pca
    X_embedding = self.pca.transform(X_scaled)
    
    embeddings_df = pd.DataFrame(X_embedding)
    embeddings_df.rename(columns={0: 'embedding1', 1: 'embedding2'}, inplace=True)

    return json.loads(embeddings_df.to_json(orient="records"))[0]


  def predict_with_shap(self, X):
    prediction = round(self.model.predict_proba(X)[0][1] * 100, ndigits=2)
    shap_values = self.explainer(X)
    return prediction, shap_values