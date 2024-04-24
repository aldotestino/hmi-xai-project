from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uuid
from models.patient import Patient
from shap_model import ShapModel

class ModelAPI(FastAPI):
    def __init__(self, model: ShapModel, allow_origins: List[str] = ["*"]):
        super().__init__()
        self.model = model
        self.configure_middleware(allow_origins)
        self.add_endpoints()

    def configure_middleware(self, allow_origins: List[str]):
        self.add_middleware(
            CORSMiddleware,
            allow_origins=allow_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def add_endpoints(self):
        self.add_api_route("/healthcheck", self.healthcheck, methods=["GET"], status_code=status.HTTP_200_OK)
        self.add_api_route("/predict", self.predict, methods=["POST"], status_code=status.HTTP_200_OK)

    def healthcheck(self):
        return {"status": "ok"}

    def predict(self, data: Patient):
        X = data.to_df()
        prediction, shap_values = self.model.predict_with_shap(X)
        features = data.model_dump().keys()
        return {
            "id": uuid.uuid4(),
            "prediction": prediction,
            "shapBaseValue": shap_values.base_values.tolist()[0],
            "shapValues": dict(zip(features, shap_values.values.tolist()[0])),
            "shapData": dict(zip(features, X.values[0])),
        }
