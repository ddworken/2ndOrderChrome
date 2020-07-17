from flask import Flask, request
import json
import time
from socket import gethostbyname, gaierror
from urllib.parse import urlparse

app = Flask(__name__)

@app.route('/api/v1/resolves')
def resolves():
    domain = urlparse(request.args.get('url')).hostname
    try:
        gethostbyname(domain)
        return json.dumps({'result': True})
    except gaierror:
        return json.dumps({'result': False})

@app.after_request
def cors(resp):
    resp.headers.add('Access-Control-Allow-Origin', '*')
    resp.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    resp.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return resp

app.run(host='0.0.0.0', port=8080, debug=True, threaded=True)
