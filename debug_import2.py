import sys, os, traceback
print('CWD:', os.getcwd())
print('sys.path[0]:', sys.path[0])
print('sys.path sample:', sys.path[:5])
print('Exists backend dir:', os.path.isdir('backend'))
print('Listing backend:', os.listdir('backend') if os.path.isdir('backend') else None)
try:
    import backend.main as bm
    print('IMPORT_OK')
except Exception:
    traceback.print_exc()
