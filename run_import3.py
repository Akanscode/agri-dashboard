import sys, traceback, os
print('CWD:', os.getcwd())
print('sys.path[0]:', sys.path[0])
print('Listing backend:', os.listdir('backend'))
try:
    import backend.main as bm
    print('IMPORT_OK')
except Exception:
    traceback.print_exc()
