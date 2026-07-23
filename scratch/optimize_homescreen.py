import os
from PIL import Image, ImageOps

src_dir = r"d:\rohit\fs\assets\images\homescreen"
target_height = 1200
max_width = 1920

print("Starting image optimization...")

for filename in os.listdir(src_dir):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        filepath = os.path.join(src_dir, filename)
        
        # Skip temp/metadata files starting with ._
        if filename.startswith('._'):
            continue
            
        try:
            with Image.open(filepath) as img:
                # Get original format
                img_format = img.format
                
                # Auto-orient based on EXIF data
                img = ImageOps.exif_transpose(img)
                
                orig_width, orig_height = img.size
                print(f"Processing {filename}: {orig_width}x{orig_height}", end="")
                
                # Calculate new dimensions keeping aspect ratio
                # We want height to be 1200px. If that makes width > 1920px, we cap width at 1920px.
                new_height = target_height
                new_width = int((orig_width / orig_height) * new_height)
                
                if new_width > max_width:
                    new_width = max_width
                    new_height = int((orig_height / orig_width) * new_width)
                
                # Only resize if the image is actually larger
                if orig_height > new_height or orig_width > new_width:
                    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    print(f" -> Resized to {new_width}x{new_height}")
                else:
                    print(" -> Kept original size (already smaller)")
                
                # Save optimized image back (overwrite)
                # Convert to RGB if saving as JPEG (e.g. from PNG)
                if img.mode in ('RGBA', 'LA') and (filename.lower().endswith('.jpg') or filename.lower().endswith('.jpeg')):
                    img = img.convert('RGB')
                
                img.save(filepath, format=img_format, quality=88, optimize=True)
                
        except Exception as e:
            print(f"\nError processing {filename}: {e}")

print("Image optimization complete!")
