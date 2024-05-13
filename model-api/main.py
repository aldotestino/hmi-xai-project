import os
import uvicorn
from model import Model
from api import Api

PORT = int(os.environ.get("PORT", 8080))

if __name__ == "__main__":
    # Load the model
    model = Model()
    app = Api(model=model)

    uvicorn.run(app, host="0.0.0.0", port=PORT)
