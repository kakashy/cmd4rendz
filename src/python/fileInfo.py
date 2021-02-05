import bpy
<<<<<<< Updated upstream

scene = bpy.context.scene
print("Scene %r frames: %d..%d = %d" % (scene.name, scene.frame_start, scene.frame_end - scene.frame_start + 1))
=======
import webbrowser
import os

 # Get absolute path:
filepath = bpy.context.scene.render.filepath
absolutepath = bpy.path.abspath(filepath)


webbrowser.open(absolutepath)
>>>>>>> Stashed changes
