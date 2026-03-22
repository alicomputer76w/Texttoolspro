import os
import json
import re

def fix_faq_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all JSON-LD script blocks
    script_pattern = re.compile(r'<script type="application/ld\+json">([\s\S]*?)</script>', re.IGNORECASE)
    scripts = script_pattern.findall(content)

    faq_entities = []
    other_scripts = []
    faq_script_full_texts = []

    for script_text in scripts:
        try:
            data = json.loads(script_text.strip())
            if isinstance(data, dict) and data.get('@type') == 'FAQPage':
                # It's an FAQ script
                main_entity = data.get('mainEntity', [])
                if isinstance(main_entity, list):
                    faq_entities.extend(main_entity)
                elif isinstance(main_entity, dict):
                    faq_entities.append(main_entity)
                
                # Keep track of the full text to remove it later
                # We need to match exactly as it is in the file
                faq_script_full_texts.append(script_text)
            else:
                other_scripts.append(script_text)
        except json.JSONDecodeError:
            # Not valid JSON or some other issue, skip
            pass

    if not faq_script_full_texts:
        return False

    # Remove duplicates from faq_entities based on question name
    unique_faqs = []
    seen_questions = set()
    for entity in faq_entities:
        question_name = entity.get('name', '').strip()
        if question_name and question_name not in seen_questions:
            unique_faqs.append(entity)
            seen_questions.add(question_name)

    # Create the unified FAQ JSON
    unified_faq_json = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": unique_faqs
    }
    unified_script = f'<script type="application/ld+json">\n{json.dumps(unified_faq_json, indent=4)}\n</script>'

    # Remove all old FAQ scripts from content
    new_content = content
    for old_script_text in faq_script_full_texts:
        # Construct the full script block as it appeared in the file
        # We need to be careful with whitespace around the script tags
        # Re-searching to find the exact match including tags
        pattern = re.compile(re.escape(f'<script type="application/ld+json">') + r'\s*' + re.escape(old_script_text) + r'\s*' + re.escape('</script>'), re.IGNORECASE)
        new_content = pattern.sub('', new_content)

    # Insert the new unified script before </head>
    if '</head>' in new_content:
        new_content = new_content.replace('</head>', f'    {unified_script}\n</head>')
    else:
        # Fallback if </head> is missing
        new_content += f'\n{unified_script}'

    # Clean up multiple newlines that might have been created
    new_content = re.sub(r'\n\s*\n\s*\n', '\n\n', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

# Main execution
files_to_check = [f for f in os.listdir('.') if f.endswith('.html')]
updated_files = []

for filename in files_to_check:
    if fix_faq_in_file(filename):
        updated_files.append(filename)

print(f"Updated {len(updated_files)} files: {', '.join(updated_files)}")
