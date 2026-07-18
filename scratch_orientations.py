import urllib.request
from PIL import Image
import io
import re

urls = [
    "https://iili.io/C73U6YP.jpg",
    "https://iili.io/C73Ug4V.jpg",
    "https://iili.io/C73Uwv9.jpg",
    "https://iili.io/C73UvQj.jpg",
    "https://iili.io/C73Ukhb.jpg",
    "https://iili.io/C73UMB4.jpg",
    "https://iili.io/C73UY7t.jpg",
    "https://iili.io/C73UakX.jpg",
    "https://iili.io/C73UA1p.jpg",
    "https://iili.io/C73UzhJ.jpg",
    "https://iili.io/C73UxIa.jpg",
    "https://iili.io/C73Unmg.jpg",
    "https://iili.io/C73UB71.jpg",
    "https://iili.io/C73UqdP.jpg",
    "https://iili.io/C73UKrB.jpg",
    "https://iili.io/C73UF1V.jpg",
    "https://iili.io/C73U3qQ.jpg",
    "https://iili.io/C73UHzb.jpg",
    "https://iili.io/C73Symu.jpg",
    "https://iili.io/C73Spee.jpg",
    "https://iili.io/C73Sbd7.jpg",
    "https://iili.io/C73StgS.jpg",
    "https://iili.io/C73SZ12.jpg",
    "https://iili.io/C73SQql.jpg",
    "https://iili.io/C73S4bs.jpg",
    "https://iili.io/C73S8gI.jpg",
    "https://iili.io/C73Sren.jpg",
    "https://iili.io/C73Sg5X.jpg",
    "https://iili.io/C73SNWv.jpg",
    "https://iili.io/C73SwzJ.jpg",
    "https://iili.io/C73SXOg.jpg",
    "https://iili.io/C73SW5F.jpg",
    "https://iili.io/C73STU7.jpg",
    "https://iili.io/C73S5Ou.jpg",
    "https://iili.io/C73SAJ9.jpg",
    "https://iili.io/C73SVJ1.jpg",
    "https://iili.io/C73Swb.jpg",
    "https://iili.io/C738NFS.jpg",
    "https://iili.io/C738v9e.jpg",
    "https://iili.io/C738eS9.jpg",
    "https://iili.io/C738qGV.jpg",
    "https://iili.io/C738x8F.jpg",
    "https://iili.io/C738B6B.jpg",
    "https://iili.io/C738n3P.jpg"
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
