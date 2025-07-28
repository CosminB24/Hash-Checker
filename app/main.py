import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify
import os
import json
import hashlib
import datetime

app = Flask(__name__)


@app.route("/scan", methods=["GET", "POST"])
def scan():
    token = request.headers.get("Bearer")
    if token != "test":
        return jsonify({"message": "Unauthorized"}), 401

    
    if 'file' in request.files:
        file = request.files['file']
        sha256 = hashlib.sha256()
        while True:
            chunk = file.stream.read(4096)
            if not chunk:
                break
            sha256.update(chunk)
        hash_value = sha256.hexdigest()

  
    elif request.content_type == "application/json":
        data = request.get_json(silent=True)
        if not data or "hash" not in data:
            return jsonify({"message": "No hash provided"}), 400
        hash_value = data["hash"]

    else:
        return jsonify({"message": "Unsupported Media Type"}), 415

    result = vt_check(hash_value)
    return jsonify(result)


    # if request.method == "POST":
    #     data = request.get_json()
    #     hash_value = data.get("hash")

    #     results = str(vt_check(hash_value))

        # if results:
        #     print(json.dumps(results, indent=4))
        #     stamp = str(datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S"))
        #     with open(f'{stamp}.json', "w") as outfile:
        #         outfile.write(results)
        
        # return results

    # if request.method == "GET":
    #     hash_value = calculate_hash('antonia.txt')
    #     print(hash_value)
    #     check_vt = vt_check(hash_value)

    #     return hash_value
    # hash_value = calculate_hash('antonia.txt')
    # test_hash = "44d88612fea8a8f36de82e1278abb02f"

    # results = str(vt_check(test_hash))

    # if results:
    #     print(json.dumps(results, indent=4))
    #     stamp = str(datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S"))
    #     with open(f'{stamp}.json', "w") as outfile:
    #         outfile.write(results)
    # return results

load_dotenv()

VT_API = os.getenv("VT_API")

def calculate_hash(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, 'rb') as f:
        for block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(block)

    return sha256_hash.hexdigest()

def vt_check(hash_value):
    url = f"https://www.virustotal.com/api/v3/files/{hash_value}"
    headers = {
        "x-apikey": VT_API
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        stats = data["data"]["attributes"]["last_analysis_stats"]
        return stats
    elif response.status_code == 404:
        print("This file seems legit according to VirusTotal")
        return None
    else:
        print("There was an error processing the file", response.status_code)
        print(response.text)
        return None

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)

# if __name__ == "__main__":
#     hash_value = calculate_hash("antonia.txt")
#     print(hash_value)

#     results = str(vt_check(hash_value))

#     if results:
#         print(json.dumps(results, indent=4))
#         stamp = str(datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S"))
#         with open(f'{stamp}.json', "w") as outfile:
#             outfile.write(results)

