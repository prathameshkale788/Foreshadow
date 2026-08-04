import json, struct, urllib.request, os

IMAGES = [
    "https://iili.io/C8OpMog.jpg",
    "https://iili.io/C8OpVVa.jpg",
    "https://iili.io/C8OpaSV.jpg",
    "https://iili.io/C8Op0AP.jpg",
    "https://iili.io/C8OpSxn.jpg",
    "https://iili.io/C8OpQO7.jpg",
    "https://iili.io/C8Opmib.jpg",
    "https://iili.io/C8OydJV.jpg",
    "https://iili.io/C8OynqJ.jpg",
    "https://iili.io/C8OyT5N.jpg",
    "https://iili.io/C8OycqG.jpg",
    "https://iili.io/C8Oy0g4.jpg",
    "https://iili.io/C8OyMeS.jpg",
    "https://iili.io/C8OyVm7.jpg",
    "https://iili.io/C8OyjLu.jpg",
    "https://iili.io/C8OyO1j.jpg",
    "https://iili.io/C8OyUmP.jpg",
    "https://iili.io/C8OyiBa.jpg",
    "https://iili.io/C8e99Qn.jpg",
    "https://iili.io/C8e9JBs.jpg",
    "https://iili.io/C8e9CT7.jpg",
    "https://iili.io/C8e9oQe.jpg",
    "https://iili.io/C8e9T4j.jpg",
    "https://iili.io/C8e97yB.jpg",
    "https://iili.io/C8e9cj1.jpg",
    "https://iili.io/C8e9G6J.jpg",
    "https://iili.io/C8e9WaR.jpg",
    "https://iili.io/C8e9wuI.jpg",
    "https://iili.io/C8e9knn.jpg",
    "https://iili.io/C8e9ga4.jpg",
    "https://iili.io/C8e9iw7.jpg",
    "https://iili.io/C8e9ZMu.jpg",
    "https://iili.io/C8e9t6b.jpg",
    "https://iili.io/C8e9mcx.jpg",
    "https://iili.io/C8eH99V.jpg",
    "https://iili.io/C8eHdt1.jpg",
    "https://iili.io/C8eH3oF.jpg",
    "https://iili.io/C8eHBcv.jpg",
    "https://iili.io/C8eHCSR.jpg",
    "https://iili.io/C8eHo9p.jpg",
    "https://iili.io/C8eHxAN.jpg",
    "https://iili.io/C8eH7KG.jpg",
    "https://iili.io/C8eHlHl.jpg",
    "https://iili.io/C8eH0R2.jpg",
    "https://iili.io/C8eHMx9.jpg",
    "https://iili.io/C8eHhKb.jpg",
    "https://iili.io/C8eHwUx.jpg",
    "https://iili.io/C8eHjlj.jpg",
    "https://iili.io/C8eHkOB.jpg",
    "https://iili.io/C8eHSx1.jpg",
    "https://iili.io/C8eH4fa.jpg",
    "https://iili.io/C8eH60J.jpg",
    "https://iili.io/C8eHLRp.jpg",
    "https://iili.io/C8eHbWX.jpg",
    "https://iili.io/C8eHDxt.jpg",
    "https://iili.io/C8eHyfs.jpg",
    "https://iili.io/C8eJFbS.jpg",
    "https://iili.io/C8eJfz7.jpg",
    "https://iili.io/C8eJnqu.jpg",
    "https://iili.io/C8eJxgj.jpg",
    "https://iili.io/C8eJT5Q.jpg",
    "https://iili.io/C8eJAmB.jpg",
    "https://iili.io/C8eJ7X1.jpg",
    "https://iili.io/C8eJO1s.jpg",
    "https://iili.io/C8eJv2f.jpg",
    "https://iili.io/C8eJSkl.jpg",
    "https://iili.io/C8eJUp2.jpg",
    "https://iili.io/C8edqpp.jpg",
    "https://iili.io/C8edCTN.jpg",
    "https://iili.io/C8edT4s.jpg",
    "https://iili.io/C8edIGn.jpg",
    "https://iili.io/C8edA3G.jpg",
    "https://iili.io/C8edRaf.jpg",
    "https://iili.io/C8ed7yl.jpg",
    "https://iili.io/C8ed1n9.jpg",
    "https://iili.io/C8edX8x.jpg",
    "https://iili.io/C8edwuV.jpg",
    "https://iili.io/C8edNwB.jpg",
    "https://iili.io/C8edOZP.jpg",
    "https://iili.io/C8ed86g.jpg",
    "https://iili.io/C8ed69R.jpg",
    "https://iili.io/C8edPup.jpg",
    "https://iili.io/C8edmcG.jpg",
    "https://iili.io/C8edpSf.jpg",
    "https://iili.io/C8e2JN2.jpg",
    "https://iili.io/C8e2HAl.jpg",
    "https://iili.io/C8e2dtS.jpg",
    "https://iili.io/C8e2FV9.jpg",
    "https://iili.io/C8e2Bcb.jpg",
    "https://iili.io/C8e2qKu.jpg",
    "https://iili.io/C8e2CSj.jpg",
    "https://iili.io/C8e2IDB.jpg",
    "https://iili.io/C8e2RiF.jpg",
    "https://iili.io/C8e27Kg.jpg",
    "https://iili.io/C8e20RR.jpg",
    "https://iili.io/C8e2EDN.jpg",
    "https://iili.io/C8e2VVt.jpg",
    "https://iili.io/C8e2WiX.jpg",
    "https://iili.io/C8e2gs9.jpg",
    "https://iili.io/C8e24fe.jpg",
    "https://iili.io/C8e260u.jpg",
    "https://iili.io/C8e390g.jpg",
    "https://iili.io/C8e3nqX.jpg",
    "https://iili.io/C8e3ue4.jpg",
    "https://iili.io/C8e3Aml.jpg",
    "https://iili.io/C8e37XS.jpg",
    "https://iili.io/C8e30ru.jpg",
    "https://iili.io/C8e3NB1.jpg",
    "https://iili.io/C8e3hhB.jpg",
    "https://iili.io/C8e3OEF.jpg",
    "https://iili.io/C8e3v2a.jpg",
    "https://iili.io/C8e36QI.jpg",
    "https://iili.io/C8e3L4n.jpg",
    "https://iili.io/C8e3yj2.jpg",
    "https://iili.io/C8e3pTl.jpg",
    "https://iili.io/C8eF24e.jpg",
    "https://iili.io/C8eFF3u.jpg",
    "https://iili.io/C8eFoZB.jpg",
    "https://iili.io/C8eFnjV.jpg",
    "https://iili.io/C8eFcjp.jpg",
    "https://iili.io/C8eFauR.jpg",
    "https://iili.io/C8eFG6X.jpg",
    "https://iili.io/C8eFX8G.jpg",
    "https://iili.io/C8eFwu4.jpg",
    "https://iili.io/C8eFOt2.jpg",
    "https://iili.io/C8eFknS.jpg",
    "https://iili.io/C8eFUFe.jpg",
    "https://iili.io/C8eFr8b.jpg",
    "https://iili.io/C8eFQoB.jpg",
    "https://iili.io/C8eFstV.jpg",
    "https://iili.io/C8eFbKF.jpg",
    "https://iili.io/C8eFmcg.jpg",
    "https://iili.io/C8eFpSa.jpg",
]

def get_jpeg_size(url):
    """Fetch JPEG dimensions by reading just enough bytes."""
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        data = resp.read()
    # Parse JPEG markers
    i = 0
    while i < len(data) - 1:
        if data[i] != 0xFF:
            i += 1
            continue
        marker = data[i+1]
        if marker == 0xD8:  # SOI
            i += 2
            continue
        if marker == 0xD9:  # EOI
            break
        if i + 3 >= len(data):
            break
        length = struct.unpack('>H', data[i+2:i+4])[0]
        # SOF markers
        if marker in (0xC0, 0xC1, 0xC2):
            if i + 9 <= len(data):
                h = struct.unpack('>H', data[i+5:i+7])[0]
                w = struct.unpack('>H', data[i+7:i+9])[0]
                return w, h
        i += 2 + length
    return None, None

# Load existing dimensions
dims_json_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'js', 'gallery_dimensions.json')
dims_js_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'js', 'gallery_dimensions.js')

# Use absolute paths
base = r'd:\rohit\fs'
dims_json_path = os.path.join(base, 'js', 'gallery_dimensions.json')
dims_js_path = os.path.join(base, 'js', 'gallery_dimensions.js')

with open(dims_json_path, 'r') as f:
    dims = json.load(f)

new_entries = {}
landscapes = 0
portraits = 0

for i, url in enumerate(IMAGES):
    if url in dims:
        is_land = dims[url]
        print(f"[{i+1}/{len(IMAGES)}] CACHED {url} -> {'landscape' if is_land else 'portrait'}")
        new_entries[url] = is_land
    else:
        try:
            w, h = get_jpeg_size(url)
            if w and h:
                is_land = w >= h
                new_entries[url] = is_land
                print(f"[{i+1}/{len(IMAGES)}] {url} -> {w}x{h} {'landscape' if is_land else 'portrait'}")
            else:
                new_entries[url] = False
                print(f"[{i+1}/{len(IMAGES)}] {url} -> FAILED to parse, defaulting portrait")
        except Exception as e:
            new_entries[url] = False
            print(f"[{i+1}/{len(IMAGES)}] {url} -> ERROR {e}, defaulting portrait")

    if new_entries[url]:
        landscapes += 1
    else:
        portraits += 1

# Merge into existing dims
dims.update(new_entries)

# Write JSON
with open(dims_json_path, 'w') as f:
    json.dump(dims, f, indent=2)

# Write JS
with open(dims_js_path, 'w') as f:
    f.write('window.GALLERY_DIMENSIONS = {\n')
    items = list(dims.items())
    for idx, (k, v) in enumerate(items):
        val = 'true' if v else 'false'
        comma = ',' if idx < len(items) - 1 else ''
        f.write(f'  "{k}": {val}{comma}\n')
    f.write('};\n')

print(f"\nDone! {landscapes} landscapes, {portraits} portraits out of {len(IMAGES)} images.")
print(f"Total entries in dimensions DB: {len(dims)}")
