import re
import requests
from flask import Flask, jsonify, request
from pytubefix import YouTube

app = Flask(__name__)

def extract_shorts_urls(url, max_results=10):
    """Extracts YouTube Shorts URLs from a given search URL."""
    response = requests.get(url)
    if response.status_code == 200:
        # Regex to find "url" keys containing "/shorts/"
        matches = re.findall(r'"url":"/shorts/([a-zA-Z0-9_-]+)"', response.text)
        shorts_ids = list(dict.fromkeys(matches))[:max_results]
        shorts_urls = [f"https://www.youtube.com/shorts/{short_id}" for short_id in shorts_ids]
        return shorts_urls
    else:
        print(f"Error: Received status code {response.status_code}")
        return []

def get_video_stream_url(url):
    """Fetches the video stream URL for a given YouTube Shorts URL."""
    try:
        yt = YouTube(url, 'WEB')
        
        stream = yt.streams.filter(progressive=True, file_extension="mp4").get_highest_resolution()
        stream_url = stream.url
        return stream_url
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

@app.route('/api/shorts', methods=['GET'])
def get_shorts_streams():
    """API endpoint to get the streams of YouTube Shorts based on search query."""
    search_query = request.args.get('query', '')
    if not search_query:
        return jsonify({"error": "Missing search query"}), 400
    
    search_url = f"https://www.youtube.com/results?search_query={search_query}"
    shorts_urls = extract_shorts_urls(search_url)
    
    if not shorts_urls:
        return jsonify({"error": "No shorts found"}), 404
    
    stream_urls = [get_video_stream_url(url) for url in shorts_urls]
    
    stream_urls = [url for url in stream_urls if url]
    
    return jsonify({"length": len(stream_urls), "stream_urls": stream_urls})

if __name__ == '__main__':
    app.run(debug=True)

#visitorID:
