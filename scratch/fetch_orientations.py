import json
import urllib.request
import ssl
from PIL import Image
from io import BytesIO

ssl_context = ssl._create_unverified_context()

# Load existing dimensions
with open(r"d:\rohit\fs\js\gallery_dimensions.json", "r") as f:
    dimensions = json.load(f)

# folder_5 images (Aishwarya & Shankar)
folder_5_images = [
    "https://iili.io/COBmVFj.jpg","https://iili.io/COBmauS.jpg","https://iili.io/COBmAFf.jpg",
    "https://iili.io/COBmY92.jpg","https://iili.io/COBm58l.jpg","https://iili.io/COBmIGs.jpg",
    "https://iili.io/COBbiCu.jpg","https://iili.io/COBbSv2.jpg","https://iili.io/COBb8Yl.jpg",
    "https://iili.io/COBbhhX.jpg","https://iili.io/COBbukB.jpg","https://iili.io/COBbxrx.jpg",
    "https://iili.io/COBbo1j.jpg","https://iili.io/COBbnqb.jpg","https://iili.io/COBbqXe.jpg",
    "https://iili.io/COBb272.jpg","https://iili.io/COBDbXn.jpg","https://iili.io/COBDmss.jpg",
    "https://iili.io/COBDZbt.jpg","https://iili.io/COBDsJp.jpg","https://iili.io/COBD4qJ.jpg",
    "https://iili.io/COBDSzF.jpg","https://iili.io/COBDkOP.jpg","https://iili.io/COBDOJV.jpg",
    "https://iili.io/COBDj0x.jpg","https://iili.io/COBDwUQ.jpg","https://iili.io/COBDhfj.jpg",
    "https://iili.io/COBDVWu.jpg","https://iili.io/COBDBlR.jpg","https://iili.io/COBDqKv.jpg",
    "https://iili.io/COBD3og.jpg","https://iili.io/COBtpSV.jpg","https://iili.io/COBD9HB.jpg",
    "https://iili.io/COBtmcQ.jpg","https://iili.io/COBDHAP.jpg"
]

# folder_2 images (Saurabh & Ashwini)
folder_2_images = [
    "https://iili.io/C73U6YP.jpg","https://iili.io/C73Ug4V.jpg","https://iili.io/C73Uwv9.jpg",
    "https://iili.io/C73UvQj.jpg","https://iili.io/C73Ukhb.jpg","https://iili.io/C73UMB4.jpg",
    "https://iili.io/C73UY7t.jpg","https://iili.io/C73UakX.jpg","https://iili.io/C73UA1p.jpg",
    "https://iili.io/C73UzhJ.jpg","https://iili.io/C73UxIa.jpg","https://iili.io/C73Unmg.jpg",
    "https://iili.io/C73UB71.jpg","https://iili.io/C73UqdP.jpg","https://iili.io/C73UKrB.jpg",
    "https://iili.io/C73UF1V.jpg","https://iili.io/C73U3qQ.jpg","https://iili.io/C73UHzb.jpg",
    "https://iili.io/C73Symu.jpg","https://iili.io/C73Spee.jpg","https://iili.io/C73Sbd7.jpg",
    "https://iili.io/C73StgS.jpg","https://iili.io/C73SZ12.jpg","https://iili.io/C73SQql.jpg",
    "https://iili.io/C73S4bs.jpg","https://iili.io/C73S8gI.jpg","https://iili.io/C73Sren.jpg",
    "https://iili.io/C73Sg5X.jpg","https://iili.io/C73SNWv.jpg","https://iili.io/C73SwzJ.jpg",
    "https://iili.io/C73SXOg.jpg","https://iili.io/C73SW5F.jpg","https://iili.io/C73STU7.jpg",
    "https://iili.io/C73S5Ou.jpg","https://iili.io/C73SAJ9.jpg","https://iili.io/C73SVJ1.jpg",
    "https://iili.io/C738Swb.jpg","https://iili.io/C738NFS.jpg","https://iili.io/C738v9e.jpg",
    "https://iili.io/C738eS9.jpg","https://iili.io/C738qGV.jpg","https://iili.io/C738x8F.jpg",
    "https://iili.io/C738B6B.jpg","https://iili.io/C738n3P.jpg"
]

all_images = folder_5_images + folder_2_images
total = len(all_images)
landscapes = 0
portraits = 0

for i, url in enumerate(all_images):
    if url in dimensions:
        print(f"[{i+1}/{total}] SKIP (already exists): {url}")
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

# Save updated dimensions
with open(r"d:\rohit\fs\js\gallery_dimensions.json", "w") as f:
    json.dump(dimensions, f)

print(f"\nDone! Added {landscapes} landscapes and {portraits} portraits.")
