import re
import requests
from flask import Flask, jsonify, request
from pytubefix import YouTube
from flask_cors import CORS
from concurrent.futures import ThreadPoolExecutor
from flask_caching import Cache  # Import Flask-Caching

app = Flask(__name__)
CORS(app)

# Configure caching
app.config['CACHE_TYPE'] = 'simple'  # You can switch to other backends like Redis if needed
app.config['CACHE_DEFAULT_TIMEOUT'] = 3600  # Cache results for 1 hour (in seconds)
cache = Cache(app)

def extract_shorts_urls(url, max_results=10):
    """Extracts YouTube Shorts URLs from a given search URL."""
    print(f"Starting to extract Shorts URLs from: {url}")
    response = requests.get(url)
    if response.status_code == 200:
        print(f"Received response with status code {response.status_code}")
        # Regex to find "url" keys containing "/shorts/"
        matches = re.findall(r'"url":"/shorts/([a-zA-Z0-9_-]+)"', response.text)
        print(f"Found {len(matches)} raw matches for Shorts IDs.")
        shorts_ids = list(dict.fromkeys(matches))[:max_results]
        print(f"Extracted {len(shorts_ids)} unique Shorts IDs.")
        shorts_urls = [f"https://www.youtube.com/shorts/{short_id}" for short_id in shorts_ids]
        return shorts_urls
    else:
        print(f"Error: Received status code {response.status_code}")
        return []

def get_video_stream_url(url):
    """Fetches the video stream URL for a given YouTube Shorts URL."""
    print(f"Fetching stream URL for Shorts URL: {url}")
    try:
        yt = YouTube(url, 'WEB')
        stream = yt.streams.filter(progressive=True, file_extension="mp4").get_highest_resolution()
        stream_url = stream.url
        print(f"Successfully fetched stream URL for {url}")
        return stream_url
    except Exception as e:
        print(f"An error occurred while fetching stream for {url}: {e}")
        return None

@app.route('/api/shorts', methods=['GET'])
@cache.cached(query_string=True)  # Cache the results based on the query string (search query)
def get_shorts_streams():
    """API endpoint to get the streams of YouTube Shorts based on search query."""
    search_query = request.args.get('query', '')
    if not search_query:
        return jsonify({"error": "Missing search query"}), 400

    print(f"Search query received: {search_query}")
    search_url = f"https://www.youtube.com/results?search_query={search_query}"
    print(f"Constructed search URL: {search_url}")
    
    # Check if cached result exists for this search query
    shorts_urls = extract_shorts_urls(search_url)

    if not shorts_urls:
        print("No Shorts URLs found.")
        return jsonify({"error": "No shorts found"}), 404

    print(f"Found {len(shorts_urls)} Shorts URLs. Starting to fetch video stream URLs...")
    
    # Use ThreadPoolExecutor for parallel processing
    with ThreadPoolExecutor() as executor:
        stream_urls = list(executor.map(get_video_stream_url, shorts_urls))
    
    # Filter out None values
    stream_urls = [url for url in stream_urls if url]
    print(f"Successfully fetched {len(stream_urls)} stream URLs.")

    return jsonify({"length": len(stream_urls), "stream_urls": stream_urls})

if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(debug=True)
