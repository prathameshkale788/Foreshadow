import urllib.request
from PIL import Image
import io
import re

urls = [
    "https://iili.io/CN2h03N.jpg",
    "https://iili.io/CN2hATg.jpg",
    "https://iili.io/CN2hTyF.jpg",
    "https://iili.io/CN2hc4p.jpg",
    "https://iili.io/CN2j3cN.jpg",
    "https://iili.io/CN2jJPR.jpg",
    "https://iili.io/CN2jFSI.jpg",
    "https://iili.io/CN2jf9t.jpg",
    "https://iili.io/CN2j0Vj.jpg",
    "https://iili.io/CN2jeWJ.jpg",
    "https://iili.io/CN2jkiv.jpg",
    "https://iili.io/CN2jjOF.jpg",
    "https://iili.io/CN2wKqx.jpg",
    "https://iili.io/CN2wGXs.jpg",
    "https://iili.io/CN2whrl.jpg",
    "https://iili.io/CN2wN7S.jpg",
    "https://iili.io/CN2wep9.jpg",
    "https://iili.io/CN2wrEx.jpg",
    "https://iili.io/CN2NBCG.jpg",
    "https://iili.io/CN2Nn44.jpg",
    "https://iili.io/CN2NIvS.jpg",
    "https://iili.io/CN2NTy7.jpg",
    "https://iili.io/CN2NXZg.jpg",
    "https://iili.io/CN2OHMb.jpg",
    "https://iili.io/CN2OxVa.jpg",
    "https://iili.io/CN2O7RI.jpg",
    "https://iili.io/CN2OVUl.jpg",
    "https://iili.io/CN2OOxe.jpg",
    "https://iili.io/CN2OUUQ.jpg",
    "https://iili.io/CN2OszF.jpg",
    "https://iili.io/CN2OD0v.jpg",
    "https://iili.io/CN2eHbt.jpg",
    "https://iili.io/CN2e2Xn.jpg",
    "https://iili.io/CN2e7rx.jpg",
    "https://iili.io/CN2e0mP.jpg"
]

results = {}
for i, url in enumerate(urls):
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=5) as response:
            data = response.read()
            img = Image.open(io.BytesIO(data))
            w, h = img.size
            is_portrait = h > w
            results[url] = is_portrait
            print(f"[{i+1}/{len(urls)}] {url}: {w}x{h} -> Portrait={is_portrait}")
    except Exception as e:
        print(f"Error {url}: {e}")

# Read existing gallery_dimensions.js
with open("js/gallery_dimensions.js", "r", encoding="utf-8") as f:
    content = f.read()

# Update or insert the results into the object
for url, is_portrait in results.items():
    val_str = "true" if is_portrait else "false"
    # Check if url already in file
    escaped_url = re.escape(url)
    pattern = rf'"{escaped_url}"\s*:\s*(true|false)'
    if re.search(pattern, content):
        content = re.sub(pattern, f'"{url}": {val_str}', content)
    else:
        # Insert after the opening bracket
        content = content.replace('window.GALLERY_DIMENSIONS = {', f'window.GALLERY_DIMENSIONS = {{\n  "{url}": {val_str},')

with open("js/gallery_dimensions.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Updated gallery_dimensions.js successfully!")
