from flask import Flask, jsonify, request
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/data', methods=['GET'])
def get_match():
    uri = request.args.get('uri')

    if not uri:
        return jsonify({'error': 'Missing URI parameter'}), 400

    headers = {'X-Auth-Token': 'fd490b04139846d595bd99f2de5753af', 'Accept-Encoding': ''}

    try:
        response = requests.get(uri, headers=headers)
        response.raise_for_status()  # Raise an HTTPError for bad responses (e.g., 4xx, 5xx)

        upcoming_matches = response.json()
        return jsonify(upcoming_matches)
    except requests.RequestException as e:
        print(f"Error: {e}")
        return jsonify({'error': f"Request failed: {e}"}), 500

if __name__ == '__main__':
    app.run()
