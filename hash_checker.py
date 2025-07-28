import hashlib
import requests
import json
import datetime
from dotenv import load_dotenv
import os

load_dotenv()

VT_API = os.getenv("VT_API")

def calculate_hash(file_path):
    sha256_hash = hashlib.sha256()

    with open(file_path, "rb") as f:
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
        print("The file seems okay according to VirusTotal")
        return None
    else:
        print("Error on processing the file", response.status_code)
        print(response.text)
        return None

    #stats data, attributes last_anaylsis_stats


if __name__ == "__main__":
    hash_value = calculate_hash("antonia.txt")
    print(hash_value)
    test_hash = "44d88612fea8a8f36de82e1278abb02f"

    result = str(vt_check(test_hash))
    if result:
        print(json.dumps(result, indent=4))
        stamp = str(datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S"))
        with open(f'{stamp}.json', "w") as outfile:
            outfile.write(result)
    # response = requests.get("https://api.github.com")
    # if response.status_code == 200:
    #     print("success")