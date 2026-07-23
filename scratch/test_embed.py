import urllib.request
import ssl
import re

ssl_context = ssl._create_unverified_context()
url = "https://www.instagram.com/p/DV03tqFjGfo/embed/"
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ssl_context) as response:
        html = response.read().decode('utf-8', errors='ignore')
        with open("scratch/insta_embed.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        # Look for image URLs in the HTML
        img_urls = re.findall(r'https://[^\s"\'\\<>]+?\.jpg[^\s"\'\\<>]*', html)
        print(f"Found {len(img_urls)} JPEG URLs:")
        for img in set(img_urls):
            print(img)
except Exception as e:
    print(f"Error: {e}")
