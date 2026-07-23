import urllib.request
import ssl
import re

ssl_context = ssl._create_unverified_context()
shortcodes = [
    "DV03tqFjGfo",
    "DH8TmWWMLF8",
    "DV4_r4WjPMn",
    "DYcHGoeDBfi",
    "DMehVcrILO1"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for i, code in enumerate(shortcodes, 1):
    url = f"https://www.picuki.com/media/{code}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Look for og:image
            match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html)
            if not match:
                match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html)
            if not match:
                # Look for post-image src
                match = re.search(r'class=["\']post-image["\'][^>]*src=["\']([^"\']+)["\']', html)
            
            if match:
                img_url = match.group(1)
                print(f"Post {i} ({code}): {img_url}")
            else:
                # Search for any jpg link in the body
                jpgs = re.findall(r'https://[^\s"\'\\<>]+?\.jpg[^\s"\'\\<>]*', html)
                if jpgs:
                    print(f"Post {i} ({code}) fallback: {jpgs[0]}")
                else:
                    print(f"Post {i} ({code}): Image not found.")
    except Exception as e:
        print(f"Error fetching Post {i} ({code}): {e}")
