import json

with open(r"d:\rohit\fs\js\gallery_dimensions.json", "r") as f:
    data = json.load(f)

# Format as JavaScript code
js_content = "window.GALLERY_DIMENSIONS = " + json.dumps(data, indent=2) + ";\n"

with open(r"d:\rohit\fs\js\gallery_dimensions.js", "w") as f:
    f.write(js_content)

print("Synchronized gallery_dimensions.json to gallery_dimensions.js successfully!")
