from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from models.patient import Patient
from shap_model import ShapModel

class ModelAPI(FastAPI):
  def __init__(self, model):
    super().__init__()
    self.model: ShapModel = model

    self.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
    )

    self.apply_endpoints()
  
  def apply_endpoints(self):

    @self.get("/healthcheck", status_code=status.HTTP_200_OK)
    def healthcheck():
      return {"status": "ok"}

    @self.post("/predict", status_code=status.HTTP_200_OK)
    def predict(data: Patient):
      X = data.to_df()
        
      prediction, shap_values = self.model.predict_with_shap(X)

      return {
        "prediction": prediction,
        "shapValues": shap_values.values.tolist()[0],
        "shapBaseValue": shap_values.base_values.tolist()[0],
        "shapData": shap_values.data.tolist()[0]
      }
