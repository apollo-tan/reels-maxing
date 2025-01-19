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

# Cache key to store 50 streams on launch
CACHE_KEY = 'cached_streams'

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
        print(f"Returning {len(shorts_urls)} Shorts URLs.")
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

def fetch_and_cache_streams():
    """Fetch and cache 50 YouTube Shorts streams upon startup."""
    print("Starting to fetch and cache 50 streams...")
    cached_streams = []

    # Using a search query to find shorts videos (you can modify the query to fetch more relevant content)
    search_url = "https://www.youtube.com/results?search_query=shorts"
    print(f"Fetching Shorts URLs with search URL: {search_url}")
    shorts_urls = extract_shorts_urls(search_url, max_results=50)

    if not shorts_urls:
        print("No Shorts URLs found.")
        return

    print(f"Found {len(shorts_urls)} Shorts URLs. Starting to fetch stream URLs...")

    # Fetch stream URLs for the shorts
    with ThreadPoolExecutor() as executor:
        print("Starting parallel fetching of stream URLs...")
        stream_urls = list(executor.map(get_video_stream_url, shorts_urls))

    # Filter out None values
    cached_streams = [url for url in stream_urls if url]
    print(f"Fetched {len(cached_streams)} valid stream URLs.")

    # Cache the result
    cache.set(CACHE_KEY, cached_streams)
    print(f"Successfully cached {len(cached_streams)} streams.")

@app.route('/api/shorts', methods=['GET'])
def get_shorts_streams():
    """API endpoint to get the streams of YouTube Shorts based on search query."""
    search_query = request.args.get('query', '')
    if not search_query:
        print("Missing search query in the request.")
        return jsonify({"error": "Missing search query"}), 400

    print(f"Search query received: {search_query}")
    search_url = f"https://www.youtube.com/results?search_query={search_query}"
    print(f"Constructed search URL: {search_url}")
    
    # Check if cached result exists for this search query
    print("Extracting Shorts URLs for the search query...")
    shorts_urls = extract_shorts_urls(search_url)

    if not shorts_urls:
        print("No Shorts URLs found.")
        return jsonify({"error": "No shorts found"}), 404

    print(f"Found {len(shorts_urls)} Shorts URLs. Starting to fetch video stream URLs...")

    # Use ThreadPoolExecutor for parallel processing
    with ThreadPoolExecutor() as executor:
        print("Starting parallel fetching of stream URLs...")
        stream_urls = list(executor.map(get_video_stream_url, shorts_urls))
    
    # Filter out None values
    stream_urls = [url for url in stream_urls if url]
    print(f"Successfully fetched {len(stream_urls)} stream URLs.")

    return jsonify({"length": len(stream_urls), "stream_urls": stream_urls})

@app.route('/api/cached_streams', methods=['GET'])
def get_cached_streams():
    """API endpoint to return the cached 50 streams."""
    print("Request received for cached streams.")
    cached_streams = cache.get(CACHE_KEY)
    if cached_streams:
        print(f"Returning cached streams. Found {len(cached_streams)} streams.")
        return jsonify({"length": len(cached_streams), "stream_urls": cached_streams})
    else:
        print("No cached streams available.")
        return jsonify({"error": "No cached streams available"}), 404

if __name__ == '__main__':
    # Fetch and cache streams when the app starts
    print("Starting Flask app...")
    fetch_and_cache_streams()

    print("Flask app started. Now running...")
    app.run(debug=True)
