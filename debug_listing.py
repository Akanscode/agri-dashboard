import os
from pathlib import Path
p = Path('backend')
print('Exists', p.exists())
print('Is dir', p.is_dir())
try:
    for f in sorted(p.iterdir()):
        print(' -', f.name, 'is_file=', f.is_file())
        try:
            st = f.stat()
            print('   size=', st.st_size)
        except Exception as e:
            print('   stat error', e)
except Exception as e:
    print('iter error', e)
print('\nCWD listing:')
for fn in sorted(os.listdir('.')):
    print(' *', fn)
