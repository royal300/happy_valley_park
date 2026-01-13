import os
import subprocess
import glob

# Configuration
SOURCE_DIR = "updated_ui_react_version/src/park photos"
DEST_DIR = "updated_ui_react_version/src/assets/images"
MAX_WIDTH = 1920
QUALITY = "70" # sips uses quality range check, standard is usually nice

# Ensure Dest Exists
os.makedirs(DEST_DIR, exist_ok=True)

# Map of files to process
files = glob.glob(os.path.join(SOURCE_DIR, "*"))

print(f"Found {len(files)} files to process in {SOURCE_DIR}...")

for file_path in files:
    filename = os.path.basename(file_path)
    name, ext = os.path.splitext(filename)
    
    # Skip .DS_Store and .mp4
    if filename.startswith('.') or filename.lower().endswith('.mp4'):
        continue

    # New filename: lowercase, no spaces, always jpg (unless logo)
    new_name = name.lower().replace(" ", "_").replace("game_zone", "gamezone")
    
    # Handle Logo specially
    if "logo" in new_name:
        dest_path = os.path.join(DEST_DIR, "logo.png")
        # Just copy/resize logo if needed, but usually keep png transparency
        # forcing resize might kill transparency if converted to jpg, so let's just resize png if big
        try:
            subprocess.run(["sips", "-Z", "200", file_path, "--out", dest_path], check=True)
            print(f"Processed Logo: {dest_path}")
        except Exception as e:
            print(f"Error processing logo {filename}: {e}")
        continue

    # Convert everything else to jpg
    dest_path = os.path.join(DEST_DIR, new_name + ".jpg")
    
    try:
        # sips command: -s format jpeg -Z MAX_WIDTH -s formatOptions QUALITY
        # -Z maintains aspect ratio
        cmd = [
            "sips", 
            "-s", "format", "jpeg", 
            "-Z", str(MAX_WIDTH),
            "-s", "formatOptions", "normal", # normal usually maps to reasonable compression
            file_path, 
            "--out", dest_path
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL)
        print(f"Optimized: {filename} -> {os.path.basename(dest_path)}")
    except subprocess.CalledProcessError as e:
        print(f"Failed to process {filename}")
    except Exception as e:
        print(f"Error on {filename}: {e}")

print("Optimization Complete.")
