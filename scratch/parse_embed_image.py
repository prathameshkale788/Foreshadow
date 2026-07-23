import re

try:
    with open("scratch/insta_embed.html", "r", encoding="utf-8") as f:
        text = f.read()
    
    # Find all https URLs
    urls = re.findall(r'https://[^\s"\'\\<>#]+', text)
    print(f"Total unique https URLs: {len(set(urls))}")
    for url in sorted(list(set(urls)))[:80]:
        print(url)
except Exception as e:
    print(f"Error: {e}")
