import os
import glob

html_files = glob.glob('*.html')

for file_path in html_files:
    if file_path == 'admin.html':
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if '-ar.html' in file_path:
        # Arabic
        if '<a href="media-ar.html"' not in content:
            media_class = 'nav-link active' if file_path == 'media-ar.html' else 'nav-link'
            content = content.replace(
                '<a href="contact-ar.html" class="nav-link">اتصل بنا</a>',
                f'<a href="media-ar.html" class="{media_class}">الوسائط</a>\n                <a href="contact-ar.html" class="nav-link">اتصل بنا</a>'
            )
            content = content.replace(
                '<a href="contact-ar.html" class="nav-link active">اتصل بنا</a>',
                f'<a href="media-ar.html" class="{media_class}">الوسائط</a>\n                <a href="contact-ar.html" class="nav-link active">اتصل بنا</a>'
            )
    else:
        # English
        if '<a href="media.html"' not in content:
            media_class = 'nav-link active' if file_path == 'media.html' else 'nav-link'
            content = content.replace(
                '<a href="contact.html" class="nav-link">Contact Us</a>',
                f'<a href="media.html" class="{media_class}">Media</a>\n                <a href="contact.html" class="nav-link">Contact Us</a>'
            )
            content = content.replace(
                '<a href="contact.html" class="nav-link active">Contact Us</a>',
                f'<a href="media.html" class="{media_class}">Media</a>\n                <a href="contact.html" class="nav-link active">Contact Us</a>'
            )
            
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated navbars in all HTML files.")
