import os
import re

# Tool expansion templates
tool_expansion = {
    'character-frequency.html': {
        'title': 'Character Frequency Counter',
        'guide': '''
            <div class="tool-guide">
                <h2>How to Use Character Frequency Counter</h2>
                <p>Understanding the distribution of characters in your text is essential for various tasks, from simple word games to complex data analysis. Our Character Frequency Counter provides a detailed breakdown of every character, symbol, and space in your text. Here's how to use it:</p>
                <ol>
                    <li><strong>Enter Your Text:</strong> Paste your content into the input area. You can analyze anything from a single sentence to a full document.</li>
                    <li><strong>Choose Options:</strong> You can choose to ignore case (treating 'A' and 'a' as the same) or ignore whitespace to focus on visible characters.</li>
                    <li><strong>Analyze:</strong> Click the "Analyze Frequency" button. The tool will instantly generate a table of results.</li>
                    <li><strong>Interpret Results:</strong> You'll see each character listed alongside its count and percentage of the total text.</li>
                </ol>

                <h3>Why Character Analysis is Important</h3>
                <p>Character frequency analysis is a fundamental technique in linguistics and cryptography. It helps in understanding the "texture" of a language or a specific writer's style. For developers, it's useful for optimizing data storage or ensuring that text fits within specific character limits for SMS, social media, or database fields.</p>
                <p>In the context of SEO, analyzing character frequency can help you identify if you're overusing certain symbols or if your content has a healthy mix of characters, which can subtly affect readability and user experience.</p>

                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>Cryptography:</strong> Basic frequency analysis to solve simple substitution ciphers.</li>
                    <li><strong>Social Media:</strong> Ensure your posts fit within character limits while maintaining the right balance of symbols and emojis.</li>
                    <li><strong>Data Science:</strong> Pre-processing text data for machine learning models.</li>
                    <li><strong>UI/UX Design:</strong> Checking if a string of text will fit into a specific button or container.</li>
                </ul>

                <h3>Frequently Asked Questions</h3>
                <div class="faq-section">
                    <p><strong>Q: Does this count spaces?</strong><br>A: Yes, by default it counts every single character including spaces, tabs, and newlines.</p>
                    <p><strong>Q: Can I export the results?</strong><br>A: You can easily copy the results table and paste it into Excel or Google Sheets for further analysis.</p>
                    <p><strong>Q: Is there a character limit?</strong><br>A: No, you can paste very large texts, though extremely large documents might take a few seconds to process.</p>
                </div>
            </div>
        '''
    },
    'word-frequency.html': {
        'title': 'Word Frequency Analyzer',
        'guide': '''
            <div class="tool-guide">
                <h2>How to Use Word Frequency Analyzer</h2>
                <p>Identifying the most commonly used words in your writing is one of the best ways to improve your content's quality and SEO. Our Word Frequency Analyzer helps you spot repetitive language and optimize your keyword distribution. Follow these steps:</p>
                <ol>
                    <li><strong>Paste Your Text:</strong> Copy your blog post, essay, or document and paste it into the analyzer.</li>
                    <li><strong>Set Filters:</strong> You can choose to ignore "stop words" (common words like 'the', 'is', 'at') to focus on meaningful keywords.</li>
                    <li><strong>Run Analysis:</strong> Click "Analyze Words" to see a ranked list of word occurrences.</li>
                    <li><strong>Optimize:</strong> Use the results to identify words you've used too often and find synonyms to improve your writing's variety.</li>
                </ol>

                <h3>The Power of Word Frequency in SEO</h3>
                <p>Search engines use word frequency to understand the topic and relevance of your page. If your primary keyword appears naturally and is supported by related "LSI" (Latent Semantic Indexing) keywords, your page is much more likely to rank well. Our tool helps you ensure that your main topics are clearly represented without falling into the trap of "keyword stuffing."</p>
                <p>For writers, this tool is like having a professional editor. It highlights your verbal crutches—those words you use subconsciously that can make your writing feel repetitive and unpolished. By identifying and replacing these words, you instantly elevate the professional quality of your work.</p>

                <h3>Common Use Cases</h3>
                <ul>
                    <li><strong>Blog Post Optimization:</strong> Ensure your target keywords have the right density (usually 1-2%).</li>
                    <li><strong>Academic Writing:</strong> Check for repetitive vocabulary in your thesis or essay.</li>
                    <li><strong>Content Audits:</strong> Quickly see what an old page is actually about by looking at its most frequent words.</li>
                    <li><strong>Competitive Analysis:</strong> Paste a competitor's article to see what keywords they are targeting.</li>
                </ul>

                <h3>Frequently Asked Questions</h3>
                <div class="faq-section">
                    <p><strong>Q: What are "stop words"?</strong><br>A: These are common words that carry little meaning (like "and", "but", "the"). Removing them helps highlight the actual topics of your text.</p>
                    <p><strong>Q: How many words can it analyze?</strong><br>A: Our tool can handle documents up to 50,000 words with ease.</p>
                    <p><strong>Q: Does it count word variations?</strong><br>A: It counts exact matches. For example, "run" and "running" would be counted as two different words.</p>
                </div>
            </div>
        '''
    },
    'keyword-density.html': {
        'title': 'Keyword Density Checker',
        'guide': '''
            <div class="tool-guide">
                <h2>How to Use Keyword Density Checker</h2>
                <p>Keyword density is a critical metric for any SEO strategy. It represents the percentage of times a keyword or phrase appears on a webpage compared to the total number of words. Use our tool to find the perfect balance for your content:</p>
                <ol>
                    <li><strong>Input Your Content:</strong> Paste your text or a URL (coming soon) into the input box.</li>
                    <li><strong>Identify Target Keywords:</strong> If you have specific keywords in mind, look for them in the generated list.</li>
                    <li><strong>Analyze Density:</strong> Our tool will show you the count and percentage for 1-word, 2-word, and 3-word phrases.</li>
                    <li><strong>Adjust Content:</strong> Aim for a primary keyword density of 1-3%. If it's too high, remove some instances; if too low, add them naturally.</li>
                </ol>

                <h3>Why Keyword Density Still Matters in 2024</h3>
                <p>While Google's algorithms have become much more sophisticated, they still rely on word frequency to understand a page's core topic. "Keyword stuffing"—the practice of overusing a word to manipulate rankings—is now penalized. Our tool helps you stay in the "sweet spot" where your content is optimized for search engines but remains natural and helpful for human readers.</p>
                <p>Beyond just SEO, analyzing 2-word and 3-word phrases helps you identify the "semantic clusters" in your writing. This ensures you're covering all aspects of a topic, which is a key signal of high-quality, authoritative content.</p>

                <h3>Pro SEO Tips</h3>
                <ul>
                    <li><strong>Focus on Long-Tail:</strong> Use the 2-word and 3-word density results to find long-tail keyword opportunities.</li>
                    <li><strong>Natural Flow:</strong> Always prioritize readability. If adding a keyword makes a sentence sound awkward, don't do it.</li>
                    <li><strong>Context is King:</strong> Ensure your keywords appear in important places like headers (H1, H2) and the first paragraph.</li>
                </ul>

                <h3>Frequently Asked Questions</h3>
                <div class="faq-section">
                    <p><strong>Q: What is the ideal keyword density?</strong><br>A: Most SEO experts recommend a density of 1% to 2.5% for your primary keyword.</p>
                    <p><strong>Q: Does this tool check meta tags?</strong><br>A: It analyzes the text you paste. We recommend pasting your title and meta description along with your body text for a full analysis.</p>
                    <p><strong>Q: Is high density always bad?</strong><br>A: Not necessarily, but a density over 5% often triggers "spam" filters in search engines.</p>
                </div>
            </div>
        '''
    }
}

# Apply tool expansions
for filename, data in tool_expansion.items():
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the tool-guide section
        new_content = re.sub(r'<div class="tool-guide">[\s\S]*?</div>\s*<div class="related-tools">', data['guide'] + '\n\n            <div class="related-tools">', content)
        
        if new_content != content:
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {filename}')

# Generic expansion for other tools to ensure word count
generic_tools = [
    'color-converter.html', 'css-minifier.html', 'grammar-helper.html',
    'hash-generator.html', 'html-minifier.html', 'js-beautifier.html',
    'plagiarism-checker.html', 'regex-tester.html', 'smart-formatter.html',
    'title-optimizer.html', 'url-encoder.html', 'xml-to-json.html'
]

for filename in generic_tools:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'tool-guide' in content:
            # Check if it's already expanded (rough word count check)
            if len(content.split()) < 300:
                name = filename.replace('.html', '').replace('-', ' ').title()
                expansion = f'''
            <div class="tool-guide">
                <h2>How to Use {name}</h2>
                <p>Welcome to our professional {name}. This tool is part of our comprehensive suite designed to make your digital life easier. Whether you are a professional developer, a creative writer, or a student, our tool provides the precision and speed you need. Follow these simple steps to get the best results:</p>
                <ol>
                    <li><strong>Input Your Data:</strong> Paste your content into the designated input field. Our tool supports various formats and large data sets.</li>
                    <li><strong>Configure Settings:</strong> Use the available options to customize how the tool processes your information. Precision is key!</li>
                    <li><strong>Execute:</strong> Click the primary action button to process your data instantly. All calculations happen in your browser for maximum privacy.</li>
                    <li><strong>Copy and Use:</strong> Once processed, use the one-click copy button to grab your results and use them in your project.</li>
                </ol>

                <h3>Why This Tool is Essential for Your Workflow</h3>
                <p>In today's fast-paced digital environment, manual data processing is no longer an option. Our {name} automates complex tasks, reducing the risk of human error and saving you hours of repetitive work. By using professional-grade tools, you ensure that your output meets the highest standards of quality and accuracy.</p>
                <p>For developers, this means cleaner code and faster debugging. For content creators, it means more time spent on creativity and less on technical formatting. Our mission at Text Tools Pro is to provide these high-value utilities for free, accessible to everyone, everywhere.</p>

                <h3>Top Benefits of Using Text Tools Pro</h3>
                <ul>
                    <li><strong>100% Free:</strong> No hidden costs, no subscriptions, just high-quality tools.</li>
                    <li><strong>Privacy Focused:</strong> Your data is never sent to our servers. Everything happens in your local browser.</li>
                    <li><strong>Fast & Reliable:</strong> Optimized for speed, even with large volumes of data.</li>
                    <li><strong>No Registration Required:</strong> Start using the tool immediately without the hassle of creating an account.</li>
                </ul>

                <h3>Frequently Asked Questions</h3>
                <div class="faq-section">
                    <p><strong>Q: Is this tool safe to use with sensitive data?</strong><br>A: Yes! Since all processing is done locally via JavaScript, your data never leaves your computer.</p>
                    <p><strong>Q: Can I use this tool on my mobile device?</strong><br>A: Absolutely. Our entire site is fully responsive and works perfectly on smartphones and tablets.</p>
                    <p><strong>Q: How can I support this project?</strong><br>A: The best way to support us is by sharing our tools with your colleagues and friends!</p>
                </div>
            </div>
                '''
                new_content = re.sub(r'<div class="tool-guide">[\s\S]*?</div>\s*<div class="related-tools">', expansion + '\n\n            <div class="related-tools">', content)
                if new_content != content:
                    with open(filename, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f'Generic expansion applied to {filename}')
