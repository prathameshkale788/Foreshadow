import urllib.request
import ssl
import re

ssl_context = ssl._create_unverified_context()
url = "https://www.instagram.com/p/DV03tqFjGfo/"
headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
}

try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ssl_context) as response:
        html = response.read().decode('utf-8', errors='ignore')
        with open("scratch/insta_googlebot.html", "w", encoding="utf-8") as f:
            f.write(html)
        
        # Search for og:image
        match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html)
        if not match:
            match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html)
        
        if match:
            print(f"FOUND Image: {match.group(1)}")
        else:
            # Let's search for any image urls
            img_urls = re.findall(r'https://[^\s"\'\\<>]+?\.jpg[^\s"\'\\<>]*', html)
            print(f"Found {len(img_urls)} JPEGs. Head: {img_urls[:5]}")
except Exception as e:
    print(f"Error: {e}")
