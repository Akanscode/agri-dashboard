import traceback

try:
    import backend.main as bm
    print("IMPORT_OK")
except Exception:
    traceback.print_exc()
