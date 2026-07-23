import urllib.request
import ssl
import re
import os
import html

ssl_context = ssl._create_unverified_context()
shortcodes = [
    "DV03tqFjGfo",
    "DH8TmWWMLF8",
    "DV4_r4WjPMn",
    "DYcHGoeDBfi",
    "DMehVcrILO1"
]

headers = {
    'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
}

output_dir = "assets/images/drive_photos/folder_1"
os.makedirs(output_dir, exist_ok=True)

for i, code in enumerate(shortcodes, 1):
    url = f"https://www.instagram.com/p/{code}/"
    try:
        print(f"Fetching post {i} ({code})...")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context) as response:
            page_content = response.read().decode('utf-8', errors='ignore')
            
            # Find og:image content
            match = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', page_content)
            if not match:
                match = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', page_content)
            
            if match:
                img_url = match.group(1)
                # Unescape HTML entities in the URL (like &amp; to &)
                img_url = html.unescape(img_url)
                print(f"Downloading image from: {img_url}")
                
                # Download and save the image
                img_req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(img_req, context=ssl_context) as img_resp:
                    img_data = img_resp.read()
                    output_path = os.path.join(output_dir, f"insta_{i}.jpg")
                    with open(output_path, "wb") as f:
                        f.write(img_data)
                    print(f"Saved to {output_path}")
            else:
                print(f"Error: could not find image tag for post {code}.")
    except Exception as e:
        print(f"Error processing post {code}: {e}")
