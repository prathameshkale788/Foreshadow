import os
import shutil
from PIL import Image, ImageOps

def copy_and_compress_images():
    source_dir = r"C:\Users\rohit\Downloads\crowsel"
    dest_dir = r"d:\rohit\fs\assets\images\carousel"
    
    # Mapping of source names to our systematic naming
    mapping = {
        "DSC06683.JPG": "carousel_1.jpg",
        "DSC08563.JPG": "carousel_2.jpg",
        "IMG_6176.JPG.jpeg": "carousel_3.jpg",
        "IMG_8777.JPEG": "carousel_4.jpg",
        "PKP01020.JPG": "carousel_5.jpg",
        "PKP01026.JPG": "carousel_6.jpg",
        "PKP01264.JPG": "carousel_7.jpg",
        "PKP01366.JPG": "carousel_8.jpg",
        "WhatsApp Image 2026-07-08 at 8.53.22 PM.jpeg": "carousel_9.jpg",
        "WhatsApp Image 2026-07-08 at 8.54.02 PM (1).jpeg": "carousel_10.jpg",
        "WhatsApp Image 2026-07-08 at 8.54.02 PM.jpeg": "carousel_11.jpg",
        "WhatsApp Image 2026-07-08 at 9.17.55 PM.jpeg": "carousel_12.jpg",
        "WhatsApp Image 2026-07-08 at 9.24.27 PM.jpeg": "carousel_13.jpg",
        "crew.jpeg": "carousel_14.jpg",
        "pkp-813.JPG.jpeg": "carousel_15.jpg"
    }
    
    # Ensure destination directory exists
    os.makedirs(dest_dir, exist_ok=True)
    
    for src_name, dest_name in mapping.items():
        src_path = os.path.join(source_dir, src_name)
        dest_path = os.path.join(dest_dir, dest_name)
        
        if not os.path.exists(src_path):
            print(f"Source file {src_name} not found, skipping...")
            continue
            
        try:
            # Copy original to destination first
            shutil.copy2(src_path, dest_path)
            
            # Open image from destination
            with Image.open(dest_path) as img:
                orig_size = os.path.getsize(dest_path)
                
                # Transpose image according to EXIF Orientation tags
                img = ImageOps.exif_transpose(img)
                
                # Convert to RGB mode if not already (JPEGs must be RGB)
                if img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Resize to maximum dimension of 1200px
                max_dim = 1200
                width, height = img.size
                if width > max_dim or height > max_dim:
                    if width > height:
                        new_width = max_dim
                        new_height = int((height * max_dim) / width)
                    else:
                        new_height = max_dim
                        new_width = int((width * max_dim) / height)
                    img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    print(f"Resized {dest_name} to {new_width}x{new_height}")
                
                # Save back with compression
                img.save(dest_path, "JPEG", quality=75, optimize=True)
                new_size = os.path.getsize(dest_path)
                reduction = ((orig_size - new_size) / orig_size) * 100
                print(f"Corrected & Compressed {dest_name}: {orig_size/1024/1024:.2f}MB -> {new_size/1024:.1f}KB ({reduction:.1f}% reduction)")
                
        except Exception as e:
            print(f"Error processing {src_name}: {e}")

if __name__ == "__main__":
    copy_and_compress_images()
