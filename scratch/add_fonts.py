import os

font_snippet = '''  <!-- Google Fonts: Bodoni Moda, Manrope & Inter (Cineglimpse Stories) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,300;1,6..96,400;1,6..96,500;1,6..96,600;1,6..96,700&family=Manrope:wght@200;300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
'''

html_files = ['index.html', 'portfolio.html', 'films.html', 'gallery.html', 'about.html', 'contact.html', 'exclusive.html', 'careers.html']

base_dir = r'd:\rohit\fs'

for fname in html_files:
    fpath = os.path.join(base_dir, fname)
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'Bodoni+Moda' not in content:
        if '<link rel="stylesheet" href="css/style.css">' in content:
            content = content.replace('<link rel="stylesheet" href="css/style.css">', font_snippet + '  <link rel="stylesheet" href="css/style.css">')
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {fname}')
        else:
            print(f'CSS link not found in {fname}')
    else:
        print(f'Already present in {fname}')
