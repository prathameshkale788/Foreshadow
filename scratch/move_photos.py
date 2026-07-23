import os
import re

def main():
    workspace = r"d:\rohit\fs"
    drive_photos_dir = os.path.join(workspace, "assets", "images", "drive_photos")
    images_dir = os.path.join(workspace, "assets", "images")
    
    # 1. Get list of files in drive_photos
    files_to_move = []
    if os.path.exists(drive_photos_dir):
        files_to_move = [f for f in os.listdir(drive_photos_dir) if os.path.isfile(os.path.join(drive_photos_dir, f))]
        
    print(f"Files to move: {files_to_move}")
    
    # 2. Move files
    for file in files_to_move:
        src = os.path.join(drive_photos_dir, file)
        dst = os.path.join(images_dir, file)
        if os.path.exists(src):
            if os.path.exists(dst):
                print(f"Warning: {file} already exists in assets/images/, overwriting...")
                os.remove(dst)
            os.rename(src, dst)
            print(f"Moved: {file}")
            
    # Remove drive_photos directory if empty
    if os.path.exists(drive_photos_dir) and not os.listdir(drive_photos_dir):
        os.rmdir(drive_photos_dir)
        print("Deleted empty drive_photos directory.")
        
    # 3. Update references in code files
    # Scan all .html, .js, .css files and replace "assets/images/drive_photos/" with "assets/images/"
    for root, dirs, files in os.walk(workspace):
        if '.git' in root.split(os.sep) or 'scratch' in root.split(os.sep):
            continue
        for file in files:
            if file.endswith(('.html', '.js', '.css')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        
                    # Replace references
                    new_content = content.replace("assets/images/drive_photos/", "assets/images/")
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated references in: {os.path.relpath(filepath, workspace)}")
                except Exception as e:
                    print(f"Error updating {file}: {e}")

if __name__ == "__main__":
    main()
