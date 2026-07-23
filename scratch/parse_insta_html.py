import re

try:
    with open("scratch/insta_raw.html", "r", encoding="utf-8") as f:
        html = f.read()
    
    # Extract JPEGs/PNGs/WebPs
    urls = re.findall(r'https://[^\s"\'\\<>]+?\.(?:jpg|jpeg|png|webp)[^\s"\'\\<>]*', html)
    print(f"Found {len(urls)} URLs:")
    for url in sorted(list(set(urls))):
        print(url)
except Exception as e:
    print(f"Error: {e}")
