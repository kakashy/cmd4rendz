import bpy

scene = bpy.context.scene
print("Scene %r frames: %d..%d = %d" % (scene.name, scene.frame_start, scene.frame_end - scene.frame_start + 1))