import json

# Load existing dimensions
with open(r"d:\rohit\fs\js\gallery_dimensions.json", "r") as f:
    data = json.load(f)

# Invert values for keys starting with assets/images/drive_photos/folder_2/
inverted_count = 0
for k in list(data.keys()):
    if k.startswith("assets/images/drive_photos/folder_2/"):
        data[k] = not data[k]
        inverted_count += 1

# Save updated JSON
with open(r"d:\rohit\fs\js\gallery_dimensions.json", "w") as f:
    json.dump(data, f)

# Sync to JS
js_content = "window.GALLERY_DIMENSIONS = " + json.dumps(data, indent=2) + ";\n"
with open(r"d:\rohit\fs\js\gallery_dimensions.js", "w") as f:
    f.write(js_content)

print(f"Corrected and inverted {inverted_count} local folder_2 keys in JSON and JS successfully!")
