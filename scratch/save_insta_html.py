import urllib.request
import ssl

ssl_context = ssl._create_unverified_context()
url = "https://www.instagram.com/p/DV03tqFjGfo/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ssl_context) as response:
        html = response.read().decode('utf-8', errors='ignore')
        with open("scratch/insta_raw.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("HTML saved successfully.")
except Exception as e:
    print(f"Error: {e}")
