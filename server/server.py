import os
from flask import Flask, jsonify, request
from os import environ
from openai import OpenAI
from flask_cors import CORS
import json
app = Flask(__name__)

CORS(app)
# venv: venv\Scripts\activate
# how to delete environments??!
# todo: setup anaconda
os.environ["OPENAI_API_KEY"] = apikey

@app.route("/predict", methods=["POST"])
def predict():
    existing_messages = json.loads(request.form["existingMessages"])
    print(existing_messages)
    client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
    completion = client.chat.completions.create(
        model='gpt-3.5-turbo',
        messages=existing_messages)
    return jsonify({"result": completion.choices[0].message.content})


if __name__ == '__main__':
    app.run(debug=True)