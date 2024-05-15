FROM python:3.9
WORKDIR /usr/src/model_api
COPY requirements.txt .
RUN pip install -r ./requirements.txt
COPY . .
CMD ["python", "main.py"]