import json
import urllib.request
import ssl
from PIL import Image
from io import BytesIO

ssl_context = ssl._create_unverified_context()

new_images = [
    "https://iili.io/C8OQ3nR.jpg",
    "https://iili.io/C8OQdZv.jpg",
    "https://iili.io/C8OLp8F.jpg",
    "https://iili.io/C8OLt6B.jpg",
    "https://iili.io/C8OLQCQ.jpg",
    "https://iili.io/C8OLPTb.jpg",
    "https://iili.io/C8OLsZx.jpg",
    "https://iili.io/C8OLijj.jpg",
    "https://iili.io/C8OL4yu.jpg",
    "https://iili.io/C8OLga9.jpg",
    "https://iili.io/C8OLU37.jpg",
    "https://iili.io/C8OL84S.jpg",
    "https://iili.io/C8OLvG2.jpg",
    "https://iili.io/C8OLOQ4.jpg",
    "https://iili.io/C8OLNjf.jpg",
    "https://iili.io/C8OLhps.jpg",
    "https://iili.io/C8OLXvn.jpg",
    "https://iili.io/C8OLV2t.jpg",
    "https://iili.io/C8OLWYX.jpg",
    "https://iili.io/C8OLEEN.jpg",
    "https://iili.io/C8OLlQR.jpg",
    "https://iili.io/C8OLaTJ.jpg",
    "https://iili.io/C8OLchv.jpg",
    "https://iili.io/C8OLA21.jpg",
    "https://iili.io/C8OLoLQ.jpg",
    "https://iili.io/C8OLK7e.jpg",
    "https://iili.io/C8OLF29.jpg",
    "https://iili.io/C8OLd1S.jpg",
    "https://iili.io/C8OLJB2.jpg",
    "https://iili.io/C8OsSea.jpg",
    "https://iili.io/C8OsvdF.jpg",
    "https://iili.io/C8OsO0P.jpg",
    "https://iili.io/C8OsjsV.jpg",
    "https://iili.io/C8OsVbj.jpg",
    "https://iili.io/C8OsG5u.jpg",
    "https://iili.io/C8OsEJe.jpg",
    "https://iili.io/C8Os0g9.jpg",
    "https://iili.io/C8Os5x4.jpg",
    "https://iili.io/C8Os7Wl.jpg",
    "https://iili.io/C8OsuOG.jpg",
    "https://iili.io/C8OsTRs.jpg",
    "https://iili.io/C8Os9l1.jpg",
    "https://iili.io/C8Oi4K7.jpg",
    "https://iili.io/C8OijcX.jpg",
    "https://iili.io/C8OiwSn.jpg",
    "https://iili.io/C8OiVMN.jpg",
    "https://iili.io/C8OiEtR.jpg",
    "https://iili.io/C8Oi1wv.jpg",
    "https://iili.io/C8OiYcF.jpg",
    "https://iili.io/C8Oixuj.jpg",
    "https://iili.io/C8OiC8u.jpg",
    "https://iili.io/C8OiK67.jpg",
    "https://iili.io/C8OiFGS.jpg",
    "https://iili.io/C8OiqF9.jpg",
    "https://iili.io/C8OiHuf.jpg",
    "https://iili.io/C8OPb3X.jpg",
    "https://iili.io/C8OPt4t.jpg",
    "https://iili.io/C8OPZGI.jpg",
    "https://iili.io/C8OPQCN.jpg",
    "https://iili.io/C8OPsQp.jpg",
    "https://iili.io/C8O6EJa.jpg",
    "https://iili.io/C8O60Ug.jpg",
    "https://iili.io/C8O4Et2.jpg",
    "https://iili.io/C8O4MnS.jpg",
    "https://iili.io/C8O4jcu.jpg",
    "https://iili.io/C8O4hFe.jpg",
    "https://iili.io/C8OPNhQ.jpg"
]

# Load existing dimensions
json_path = r"d:\rohit\fs\js\gallery_dimensions.json"
js_path = r"d:\rohit\fs\js\gallery_dimensions.js"

try:
    with open(json_path, "r") as f:
        dimensions = json.load(f)
except Exception as e:
    print(f"Error loading json: {e}")
    dimensions = {}

total = len(new_images)
landscapes = 0
portraits = 0

for i, url in enumerate(new_images):
    if url in dimensions:
        is_landscape = dimensions[url]
        print(f"[{i+1}/{total}] SKIP (already exists): {url} -> {'landscape' if is_landscape else 'PORTRAIT'}")
        if is_landscape:
            landscapes += 1
        else:
            portraits += 1
        continue
    try:
        req = urllib.request.urlopen(url, context=ssl_context, timeout=15)
        img_data = req.read()
        img = Image.open(BytesIO(img_data))
        w, h = img.size
        is_landscape = w >= h  # true = landscape, false = portrait
        dimensions[url] = is_landscape
        if is_landscape:
            landscapes += 1
        else:
            portraits += 1
        print(f"[{i+1}/{total}] {w}x{h} -> {'landscape' if is_landscape else 'PORTRAIT'}: {url}")
    except Exception as e:
        print(f"[{i+1}/{total}] ERROR: {url} -> {e}")
        dimensions[url] = True  # default to landscape on error

# Save updated dimensions JSON
with open(json_path, "w") as f:
    json.dump(dimensions, f, indent=2)

# Save updated dimensions JS file
sorted_keys = sorted(dimensions.keys())
with open(js_path, "w") as f:
    f.write("window.GALLERY_DIMENSIONS = {\n")
    for idx, key in enumerate(sorted_keys):
        val_str = "true" if dimensions[key] else "false"
        comma = "," if idx < len(sorted_keys) - 1 else ""
        f.write(f'  "{key}": {val_str}{comma}\n')
    f.write("};\n")

print(f"\nDone! Added/Verified {landscapes} landscapes and {portraits} portraits.")
