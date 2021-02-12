import bpy
import webbrowser
import os

 # Get absolute path:
filepath = bpy.context.scene.render.filepath
absolutepath = bpy.path.abspath(filepath)

webbrowser.open(absolutepath)
os.startfile(absolutepath)