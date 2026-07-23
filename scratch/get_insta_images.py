import urllib.request
import re
import ssl

# Bypass SSL verification issues if any
ssl_context = ssl._create_unverified_context()

urls = [
    "https://www.instagram.com/p/DV03tqFjGfo/",
    "https://www.instagram.com/p/DH8TmWWMLF8/",
    "https://www.instagram.com/p/DV4_r4WjPMn/",
    "https://www.instagram.com/p/DYcHGoeDBfi/",
    "https://www.instagram.com/p/DMehVcrILO1/"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

for i, url in enumerate(urls, 1):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context) as response:
            html = response.read().decode('utf-8', errors='ignore')
            # Look for og:image meta tag
            match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html)
            if not match:
                match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html)
            
            if match:
                img_url = match.group(1)
                print(f"Post {i}: {img_url}")
            else:
                # Try finding any image URL in scripts or basic meta tags
                print(f"Post {i}: Image tag not found directly.")
    except Exception as e:
        print(f"Error fetching Post {i}: {e}")
