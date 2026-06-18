import requests

response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "phi3:latest",
        "prompt": "Tell me about Python programming",
        "stream": False
    }
)

print(response.json()["response"])