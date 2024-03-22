from flask import Flask
from flask import request
app = Flask(__name__)

#members api route
@app.route("/members")
def members():
    return {"members":["1","2","3"]}

@app.route("/message", methods=['GET'])
def message():
    print('wd')
    if request.method == 'GET':
        print("jo")

    return {"members":["1","2","3"]}

if __name__ == "__main__":
    app.run(debug= True)