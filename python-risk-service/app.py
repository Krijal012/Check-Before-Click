from flask import Flask, request, jsonify
from url_analyzer import analyze_url

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL missing"}), 400

    result = analyze_url(url)
    return jsonify(result)

if __name__ == "__main__":
    app.run(port=6000, debug=True)
