# syntax=docker/dockerfile:1

FROM python:3.9

WORKDIR /app

COPY rcms/requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

ENV FLASK_APP=rcms/OnlineState/api.py
CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]