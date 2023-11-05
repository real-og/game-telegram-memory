from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

ssl_cert_path = str(os.environ.get('ssl_cert_path'))
ssl_key_path = str(os.environ.get('ssl_key_path'))


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=443, ssl_context=(ssl_cert_path, ssl_key_path))
    app.run(host='0.0.0.0')