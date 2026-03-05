import os
import shutil

root = "c:\\Users\\kinta\\Epoch_Programme"
src = os.path.join(root, "Epoch_Programme_Fullstack")

# Delete old files
old_files = ["index.html", "script.js", "styles.css"]
for f in old_files:
    try: os.remove(os.path.join(root, f))
    except Exception as e: print("Remove error:", f, e)

# Clean up dirs
shutil.rmtree(os.path.join(root, "Logos"), ignore_errors=True)
shutil.rmtree(os.path.join(root, "epoch-programme-fullstack"), ignore_errors=True)

# Move all components from Epoch_Programme_Fullstack
for item in os.listdir(src):
    s = os.path.join(src, item)
    d = os.path.join(root, item)
    try: 
        if os.path.exists(d):
            if os.path.isdir(d):
                shutil.rmtree(d)
            else:
                os.remove(d)
        shutil.move(s, d)
    except Exception as e:
        print("Move error:", s, e)
        
try:
    os.rmdir(src)
except Exception as e:
    print("rmdir error:", e)
