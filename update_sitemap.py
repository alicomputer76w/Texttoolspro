import os
import re
from datetime import date

def update_sitemap_dates(sitemap_path):
    today = date.today().strftime('%Y-%m-%d')
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace all lastmod dates with today's date
    new_content = re.sub(r'<lastmod>.*?</lastmod>', f'<lastmod>{today}</lastmod>', content)
    
    if new_content != content:
        with open(sitemap_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated dates in {sitemap_path} to {today}")

if __name__ == "__main__":
    update_sitemap_dates('sitemap.xml')
