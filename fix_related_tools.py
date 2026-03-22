import os
import re
import random

# List of all actual existing tool pages
all_tools = [
    'age-calculator.html',
    'character-frequency.html',
    'color-converter.html',
    'css-minifier.html',
    'grammar-helper.html',
    'hash-generator.html',
    'html-minifier.html',
    'js-beautifier.html',
    'json-formatter.html',
    'keyword-density.html',
    'plagiarism-checker.html',
    'readability-score.html',
    'regex-tester.html',
    'smart-formatter.html',
    'text-cleaner.html',
    'title-optimizer.html',
    'url-encoder.html',
    'word-frequency.html',
    'xml-to-json.html'
]

tool_names = {
    'age-calculator.html': 'Age Calculator',
    'character-frequency.html': 'Character Frequency',
    'color-converter.html': 'Color Converter',
    'css-minifier.html': 'CSS Minifier',
    'grammar-helper.html': 'Grammar Helper',
    'hash-generator.html': 'Hash Generator',
    'html-minifier.html': 'HTML Minifier',
    'js-beautifier.html': 'JS Beautifier',
    'json-formatter.html': 'JSON Formatter',
    'keyword-density.html': 'Keyword Density',
    'plagiarism-checker.html': 'Plagiarism Checker',
    'readability-score.html': 'Readability Score',
    'regex-tester.html': 'Regex Tester',
    'smart-formatter.html': 'Smart Formatter',
    'text-cleaner.html': 'Text Cleaner',
    'title-optimizer.html': 'Title Optimizer',
    'url-encoder.html': 'URL Encoder',
    'word-frequency.html': 'Word Frequency',
    'xml-to-json.html': 'XML to JSON'
}

for filename in os.listdir('.'):
    if filename in all_tools:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Select 3 random tools other than the current one
        others = [t for t in all_tools if t != filename]
        selected = random.sample(others, 3)
        
        related_html = '            <div class="related-tools">\n                <h3>Related Tools</h3>\n                <div class="related-grid">\n'
        for s in selected:
            related_html += f'                    <a href="{s}" class="related-tool">{tool_names[s]}</a>\n'
        related_html += '                </div>\n            </div>'
        
        # Replace the related-tools section
        new_content = re.sub(r'<div class="related-tools">[\s\S]*?</div>\s*</div>', related_html + '\n        </div>', content)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated related tools in {filename}')
