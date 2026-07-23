import sys
import subprocess
try:
    from bs4 import BeautifulSoup
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "beautifulsoup4"])
    from bs4 import BeautifulSoup
import re

with open(r"C:\Users\rohit\.gemini\antigravity-ide\brain\44d58709-80f5-42b6-95db-a72ffb0a593a\.system_generated\steps\454\content.md", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
article = soup.find("article")

if not article:
    # Try finding main container
    article = soup.find(class_=re.compile("main-content|content-container|blog-item-content"))

if article:
    print("Found article container.")
    # Find all rows or image blocks
    blocks = article.find_all(class_=re.compile("sqs-row|sqs-block-image|image-wrapper"))
    print(f"Found {len(blocks)} layout blocks.")
    
    # Let's traverse the children of the post content and look at the grid structure
    # Squarespace uses .sqs-row and .sqs-col-N
    for row in article.find_all(class_="sqs-row"):
        cols = row.find_all(class_=re.compile(r"sqs-col-\d+"))
        if cols:
            col_info = []
            for col in cols:
                img = col.find("img")
                if img:
                    img_name = img.get("alt", "no-alt")
                    # Extract dimensions if present in data-image-dimensions
                    dimensions = img.get("data-image-dimensions", "")
                    col_info.append(f"{col['class']} (Img: {img_name}, Size: {dimensions})")
            if col_info:
                print(f"ROW:")
                for info in col_info:
                    print(f"  - {info}")
else:
    print("Article container not found.")
