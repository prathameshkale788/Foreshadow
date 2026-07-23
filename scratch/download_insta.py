import os
import sys

try:
    import instaloader
except ImportError:
    import subprocess
    print("Installing instaloader...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "instaloader"])
    import instaloader

L = instaloader.Instaloader(
    download_pictures=True,
    download_videos=False,
    download_comments=False,
    download_geotags=False,
    save_metadata=False,
    compress_json=False
)

shortcodes = [
    "DV03tqFjGfo",
    "DH8TmWWMLF8",
    "DV4_r4WjPMn",
    "DYcHGoeDBfi",
    "DMehVcrILO1"
]

# Ensure scratch directory exists
os.makedirs("scratch", exist_ok=True)

for i, code in enumerate(shortcodes, 1):
    try:
        print(f"Downloading post {code}...")
        post = instaloader.Post.from_shortcode(L.context, code)
        L.download_post(post, target=f"scratch/insta_{i}")
        print(f"Post {code} downloaded successfully.")
    except Exception as e:
        print(f"Error downloading {code}: {e}")
