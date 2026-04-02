import os
import re

def setup_folders_for_gh_pages():
    # Files to skip moving (but we will still update their content if they are HTML)
    skip_move = ['index.html', '404.html', 'googlea453d648b8065117.html', 'google-site-verification.html', 'remove-old-domain.html']
    
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    
    # Pattern to match relative asset links (not starting with / or http/https)
    # We want to catch href="styles.css", src="script.js", src="image.png", sitemap.xml, ads.txt, etc.
    asset_pattern = re.compile(r'(href|src)="(?!(/|http|https|#))([^"]+\.(css|js|png|ico|json|jpg|jpeg|gif|svg|xml|txt))"')

    for filename in html_files:
        filepath = os.path.join('.', filename)
        if not os.path.exists(filepath):
            continue # Might have been deleted or moved already
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Update relative asset paths to be root-relative
        new_content = asset_pattern.sub(r'\1="/\3"', content)
        
        # Handle index.html or other skip files
        if filename in skip_move:
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated assets in {filename}")
        else:
            # Move to folder/index.html
            folder_name = filename.replace('.html', '')
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)
            
            new_filepath = os.path.join(folder_name, 'index.html')
            with open(new_filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            os.remove(filepath)
            print(f"Moved {filename} to {folder_name}/index.html and updated assets")

if __name__ == "__main__":
    setup_folders_for_gh_pages()
