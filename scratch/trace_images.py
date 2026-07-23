from bs4 import BeautifulSoup

try:
    with open(r"C:\Users\rohit\.gemini\antigravity-ide\brain\44d58709-80f5-42b6-95db-a72ffb0a593a\.system_generated\steps\454\content.md", "r", encoding="utf-8") as f:
        html = f.read()
    
    soup = BeautifulSoup(html, "html.parser")
    # Only look inside article if possible
    article = soup.find("article") or soup
    imgs = article.find_all("img")
    print(f"Total images found: {len(imgs)}")
    
    for i, img in enumerate(imgs):
        src = img.get("data-src", img.get("src", ""))
        dims = img.get("data-image-dimensions", "")
        alt = img.get("alt", "")
        
        # Traverse parents
        parents = []
        p = img.parent
        for _ in range(4):
            if p:
                p_cls = "." + ".".join(p.get("class", [])) if p.get("class") else ""
                parents.append(f"{p.name}{p_cls}")
                p = p.parent
            else:
                break
        print(f"Img {i:02d}: name={alt:<35} dims={dims:<10} parents={' -> '.join(parents)}")
except Exception as e:
    print(f"Error: {e}")
