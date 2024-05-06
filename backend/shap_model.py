import json
from xgboost import XGBClassifier
import pandas as pd
from sklearn.manifold import TSNE
from shap import Explainer
import joblib

class ShapModel:
  def __init__(self):
    self.model: XGBClassifier = joblib.load("model.joblib")
    self.tsne: TSNE = TSNE(n_components=2, random_state=42)
    self.explainer: Explainer = Explainer(self.model)

  def create_tsne_embeddings(self, X, pred):
    train_df = pd.read_csv("./train.csv")
    
    X_train = train_df.drop(columns=["Outcome"])
    y_train = train_df["Outcome"]

    # add prediction
    y_final = pd.concat([y_train, pd.Series([pred])], ignore_index=True)

    # append X to X_train
    X_final = pd.concat([X_train, X], ignore_index=True)

    embeddings = self.tsne.fit_transform(X_final)
    
    tsne_df = pd.DataFrame(embeddings)
    tsne_df.rename(columns={0: 'embedding1', 1: 'embedding2'}, inplace=True)
    tsne_df["outcome"] = y_final

    return json.loads(tsne_df.to_json(orient="records"))

  def predict_with_shap(self, X):
    prediction = round(self.model.predict_proba(X)[0][1] * 100, ndigits=2)
    shap_values = self.explainer(X)
    return prediction, shap_values