try:
    with open("scratch/insta_embed.html", "r", encoding="utf-8") as f:
        text = f.read()
    print(f"HTML length: {len(text)}")
    print(text[:1000])
except Exception as e:
    print(f"Error: {e}")
