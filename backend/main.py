import os
import uvicorn
from fastapi import status
from shap_model import ShapModel
from model_api import ModelAPI

PORT = int(os.environ.get("PORT", 8080))

if __name__ == "__main__":
    # Load the model
    shap_model = ShapModel()
    app = ModelAPI(model=shap_model)

    uvicorn.run(app, host="0.0.0.0", port=PORT)
