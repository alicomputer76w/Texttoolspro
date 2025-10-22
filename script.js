// Global variables
let currentTool = null;
let inputText = '';
let outputText = '';

// DOM elements
const toolInterface = document.getElementById('tool-interface');
const toolTitle = document.getElementById('tool-title');
const inputTextArea = document.getElementById('input-text');
const outputTextArea = document.getElementById('output-text');
const toolControls = document.getElementById('tool-controls');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    createScrollToTopButton();
    initializeAnimations();
});

// Event listeners
function initializeEventListeners() {
    // Tool card clicks
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function() {
            const toolType = this.getAttribute('data-tool');
            openTool(toolType);
        });
    });

    // Input text change
    inputTextArea.addEventListener('input', function() {
        inputText = this.value;
        processText();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Home navigation functionality
    document.querySelectorAll('a[href="#home"]').forEach(homeLink => {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Close any open tool interface
            if (currentTool) {
                closeTool();
            }
            // Scroll to top/home section
            const homeSection = document.querySelector('#home');
            if (homeSection) {
                homeSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } else {
                // Fallback: scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Open tool interface
function openTool(toolType) {
    currentTool = toolType;
    const toolData = getToolData(toolType);
    
    toolTitle.textContent = toolData.title;
    toolInterface.style.display = 'block';
    
    // Clear previous content
    inputTextArea.value = '';
    outputTextArea.value = '';
    toolControls.innerHTML = '';
    
    // Add tool-specific controls
    if (toolData.controls) {
        toolControls.innerHTML = toolData.controls;
        addControlEventListeners();
    }
    
    // Scroll to tool interface
    toolInterface.scrollIntoView({ behavior: 'smooth' });
    
    // Focus on input
    setTimeout(() => inputTextArea.focus(), 300);
}

// Close tool interface
function closeTool() {
    toolInterface.style.display = 'none';
    currentTool = null;
    inputText = '';
    outputText = '';
}

// Get tool configuration data
function getToolData(toolType) {
    const tools = {
        uppercase: {
            title: 'Uppercase Converter',
            description: 'Convert text to UPPERCASE letters'
        },
        lowercase: {
            title: 'Lowercase Converter',
            description: 'Convert text to lowercase letters'
        },
        titlecase: {
            title: 'Title Case Converter',
            description: 'Convert Text To Title Case Format'
        },
        sentencecase: {
            title: 'Sentence Case Converter',
            description: 'Convert text to sentence case format'
        },
        wordcount: {
            title: 'Word Counter',
            description: 'Count words, characters, and paragraphs'
        },
        reverse: {
            title: 'Text Reverser',
            description: 'Reverse your text backwards'
        },
        removespaces: {
            title: 'Remove Extra Spaces',
            description: 'Clean up extra spaces from text'
        },
        removebreaks: {
            title: 'Remove Line Breaks',
            description: 'Remove all line breaks from text'
        },
        removeduplicates: {
            title: 'Remove Duplicate Lines',
            description: 'Remove duplicate lines from text'
        },
        sortlines: {
            title: 'Sort Lines',
            description: 'Sort text lines alphabetically',
            controls: `
                <select id="sort-order">
                    <option value="asc">Ascending (A-Z)</option>
                    <option value="desc">Descending (Z-A)</option>
                </select>
            `
        },
        randomline: {
            title: 'Random Line Picker',
            description: 'Pick random lines from text',
            controls: `
                <input type="number" id="random-count" placeholder="Number of lines" min="1" value="1">
            `
        },
        encode: {
            title: 'URL Encoder/Decoder',
            description: 'Encode or decode URL text',
            controls: `
                <select id="encode-action">
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            `
        },
        base64: {
            title: 'Base64 Encoder/Decoder',
            description: 'Encode or decode Base64 text',
            controls: `
                <select id="base64-action">
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            `
        },
        html: {
            title: 'HTML Encoder/Decoder',
            description: 'Encode or decode HTML entities',
            controls: `
                <select id="html-action">
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            `
        },
        ascii: {
            title: 'Text to ASCII Art',
            description: 'Convert text to ASCII art'
        },
        password: {
            title: 'Password Generator',
            description: 'Generate secure passwords',
            controls: `
                <input type="number" id="password-length" placeholder="Length" min="4" max="128" value="12">
                <label><input type="checkbox" id="include-uppercase" checked> Uppercase</label>
                <label><input type="checkbox" id="include-lowercase" checked> Lowercase</label>
                <label><input type="checkbox" id="include-numbers" checked> Numbers</label>
                <label><input type="checkbox" id="include-symbols"> Symbols</label>
                <button onclick="generatePassword()" class="btn-copy">Generate</button>
            `
        },
        lorem: {
            title: 'Lorem Ipsum Generator',
            description: 'Generate placeholder text',
            controls: `
                <input type="number" id="lorem-paragraphs" placeholder="Paragraphs" min="1" max="20" value="3">
                <button onclick="generateLorem()" class="btn-copy">Generate</button>
            `
        },
        diff: {
            title: 'Text Difference Checker',
            description: 'Compare two texts for differences',
            controls: `
                <div style="margin-top: 1rem;">
                    <label for="text2">Second Text:</label>
                    <textarea id="text2" placeholder="Enter second text here..." rows="4"></textarea>
                </div>
            `
        },
        stats: {
            title: 'Text Statistics',
            description: 'Detailed text analysis and statistics'
        },
        findreplace: {
            title: 'Find & Replace',
            description: 'Find and replace text patterns',
            controls: `
                <input type="text" id="find-text" placeholder="Find text">
                <input type="text" id="replace-text" placeholder="Replace with">
                <label><input type="checkbox" id="case-sensitive"> Case sensitive</label>
                <label><input type="checkbox" id="regex-mode"> Regex mode</label>
            `
        },
        textcleaner: {
            title: 'Text Cleaner Pro',
            description: 'Remove extra spaces, line breaks, and special characters',
            controls: `
                <label><input type="checkbox" id="remove-extra-spaces" checked> Remove extra spaces</label>
                <label><input type="checkbox" id="remove-line-breaks" checked> Remove line breaks</label>
                <label><input type="checkbox" id="remove-special-chars"> Remove special characters</label>
                <label><input type="checkbox" id="trim-lines" checked> Trim each line</label>
            `
        },
        smartformatter: {
            title: 'Smart Formatter',
            description: 'Automatically format and capitalize text',
            controls: `
                <label><input type="checkbox" id="auto-capitalize" checked> Auto capitalize sentences</label>
                <label><input type="checkbox" id="fix-punctuation" checked> Fix punctuation</label>
                <label><input type="checkbox" id="proper-nouns"> Capitalize proper nouns</label>
                <label><input type="checkbox" id="fix-spacing" checked> Fix spacing</label>
            `
        },
        wordfrequency: {
            title: 'Word Frequency Analyzer',
            description: 'Analyze word frequency and usage patterns',
            controls: `
                <input type="number" id="min-word-length" placeholder="Min word length" min="1" value="3">
                <label><input type="checkbox" id="case-insensitive" checked> Case insensitive</label>
                <label><input type="checkbox" id="ignore-common" checked> Ignore common words</label>
            `
        },
        readability: {
            title: 'Readability Score',
            description: 'Calculate Flesch Reading Ease and grade level',
        },
        jsonformatter: {
            title: 'JSON Formatter',
            description: 'Format, validate and beautify JSON',
            controls: `
                <select id="json-action">
                    <option value="format">Format & Beautify</option>
                    <option value="minify">Minify</option>
                    <option value="validate">Validate Only</option>
                </select>
                <input type="number" id="indent-size" placeholder="Indent size" min="1" max="8" value="2">
            `
        },
        htmlminifier: {
            title: 'HTML Minifier',
            description: 'Minify or beautify HTML code',
            controls: `
                <select id="html-minify-action">
                    <option value="minify">Minify</option>
                    <option value="beautify">Beautify</option>
                </select>
                <label><input type="checkbox" id="remove-comments" checked> Remove comments</label>
                <label><input type="checkbox" id="remove-whitespace" checked> Remove extra whitespace</label>
            `
        },
        regextester: {
            title: 'Regex Tester',
            description: 'Test regular expressions and find matches',
            controls: `
                <input type="text" id="regex-pattern" placeholder="Enter regex pattern">
                <input type="text" id="regex-flags" placeholder="Flags (g,i,m)" value="g">
                <label><input type="checkbox" id="show-groups"> Show capture groups</label>
            `
        },
        charfrequency: {
            title: 'Character Frequency',
            description: 'Analyze character frequency and distribution',
            controls: `
                <label><input type="checkbox" id="include-spaces" checked> Include spaces</label>
                <label><input type="checkbox" id="case-sensitive-chars"> Case sensitive</label>
                <label><input type="checkbox" id="show-percentages" checked> Show percentages</label>
            `
        },
        keyworddensity: {
            title: 'Keyword Density Checker',
            description: 'Check keyword density for SEO optimization',
            controls: `
                <input type="text" id="target-keyword" placeholder="Enter target keyword">
                <input type="number" id="min-keyword-length" placeholder="Min keyword length" min="1" value="2">
                <label><input type="checkbox" id="case-insensitive-keywords" checked> Case insensitive</label>
                <label><input type="checkbox" id="show-keyword-positions"> Show positions</label>
            `
        },
        metatag: {
            title: 'Meta Tag Generator',
            description: 'Generate SEO meta tags for websites',
            controls: `
                <input type="text" id="page-title" placeholder="Page Title (max 60 chars)">
                <textarea id="meta-description" placeholder="Meta Description (max 160 chars)" rows="3"></textarea>
                <input type="text" id="meta-keywords" placeholder="Keywords (comma separated)">
                <input type="text" id="author-name" placeholder="Author Name">
                <select id="robots-directive">
                    <option value="index,follow">Index, Follow</option>
                    <option value="noindex,follow">No Index, Follow</option>
                    <option value="index,nofollow">Index, No Follow</option>
                    <option value="noindex,nofollow">No Index, No Follow</option>
                </select>
            `
        },
        titleoptimizer: {
            title: 'Title & Description Optimizer',
            description: 'Optimize page titles and meta descriptions',
            controls: `
                <div style="margin-bottom: 1rem;">
                    <label for="seo-title">SEO Title:</label>
                    <input type="text" id="seo-title" placeholder="Enter your title">
                    <small>Recommended: 50-60 characters</small>
                </div>
                <div style="margin-bottom: 1rem;">
                    <label for="seo-description">Meta Description:</label>
                    <textarea id="seo-description" placeholder="Enter your meta description" rows="3"></textarea>
                    <small>Recommended: 150-160 characters</small>
                </div>
                <input type="text" id="focus-keyword" placeholder="Focus keyword (optional)">
            `
        },
        grammar: {
            title: 'Grammar Helper',
            description: 'Basic grammar and spelling checker',
            controls: `
                <label><input type="checkbox" id="check-spelling" checked> Check spelling</label>
                <label><input type="checkbox" id="check-grammar" checked> Check grammar</label>
                <label><input type="checkbox" id="suggest-improvements" checked> Suggest improvements</label>
            `
        },
        plagiarism: {
            title: 'Plagiarism Checker',
            description: 'Check text for potential plagiarism',
            controls: `
                <input type="number" id="min-match-length" placeholder="Min match length" min="3" value="5">
                <label><input type="checkbox" id="ignore-common-phrases" checked> Ignore common phrases</label>
                <label><input type="checkbox" id="case-sensitive-plagiarism"> Case sensitive</label>
                <small>Note: This is a basic similarity checker, not a comprehensive plagiarism detector.</small>
            `
        },
        xmltojson: {
            title: 'XML to JSON Converter',
            description: 'Convert XML data to JSON format',
            controls: `
                <label><input type="checkbox" id="pretty-print-json" checked> Pretty print JSON</label>
                <label><input type="checkbox" id="preserve-attributes" checked> Preserve XML attributes</label>
                <label><input type="checkbox" id="array-notation"> Use array notation for single elements</label>
            `
        },
        urlencoder: {
            title: 'URL Encoder/Decoder Pro',
            description: 'Advanced URL encoding and decoding with component support',
            controls: `
                <div style="margin-bottom: 1rem;">
                    <label>
                        <input type="radio" name="url-operation" value="encode" checked> Encode URL
                    </label>
                    <label>
                        <input type="radio" name="url-operation" value="decode"> Decode URL
                    </label>
                </div>
                <label><input type="checkbox" id="encode-components" checked> Encode URL components separately</label>
                <label><input type="checkbox" id="show-url-parts"> Show URL parts breakdown</label>
            `
        },
        cssminifier: {
            title: 'CSS Minifier',
            description: 'Minify and optimize CSS code',
            controls: `
                <label><input type="checkbox" id="remove-comments" checked> Remove comments</label>
                <label><input type="checkbox" id="remove-whitespace" checked> Remove whitespace</label>
                <label><input type="checkbox" id="optimize-colors" checked> Optimize color codes</label>
                <label><input type="checkbox" id="merge-rules"> Merge duplicate rules</label>
            `
        },
        jsbeautifier: {
            title: 'JavaScript Beautifier',
            description: 'Format and beautify JavaScript code',
            controls: `
                <div style="margin-bottom: 1rem;">
                    <label for="indent-size">Indent Size:</label>
                    <select id="indent-size">
                        <option value="2">2 spaces</option>
                        <option value="4" selected>4 spaces</option>
                        <option value="tab">Tab</option>
                    </select>
                </div>
                <label><input type="checkbox" id="preserve-newlines" checked> Preserve newlines</label>
                <label><input type="checkbox" id="space-before-conditional" checked> Space before conditionals</label>
            `
        },
        colorconverter: {
            title: 'Color Code Converter',
            description: 'Convert between HEX, RGB, HSL color formats',
            controls: `
                <div style="margin-bottom: 1rem;">
                    <label>Input Format:</label>
                    <select id="input-color-format">
                        <option value="auto">Auto-detect</option>
                        <option value="hex">HEX (#RRGGBB)</option>
                        <option value="rgb">RGB (r, g, b)</option>
                        <option value="hsl">HSL (h, s%, l%)</option>
                    </select>
                </div>
                <label><input type="checkbox" id="show-all-formats" checked> Show all formats</label>
                <label><input type="checkbox" id="show-color-preview" checked> Show color preview</label>
            `
        },
        hashgenerator: {
            title: 'Hash Generator',
            description: 'Generate MD5, SHA1, SHA256 hashes',
            controls: `
                <div style="margin-bottom: 1rem;">
                    <label>Hash Algorithm:</label>
                    <select id="hash-algorithm">
                        <option value="md5">MD5</option>
                        <option value="sha1">SHA-1</option>
                        <option value="sha256" selected>SHA-256</option>
                        <option value="all">All algorithms</option>
                    </select>
                </div>
                <label><input type="checkbox" id="uppercase-hash"> Uppercase output</label>
                <label><input type="checkbox" id="include-length"> Include hash length</label>
            `
        }
    };
    
    return tools[toolType] || { title: 'Unknown Tool', description: '' };
}

// Add event listeners to controls
function addControlEventListeners() {
    const controls = toolControls.querySelectorAll('input, select');
    controls.forEach(control => {
        control.addEventListener('change', processText);
        control.addEventListener('input', processText);
    });
    
    // Special case for text2 in diff tool
    const text2 = document.getElementById('text2');
    if (text2) {
        text2.addEventListener('input', processText);
    }
}

// Process text based on current tool
function processText() {
    if (!currentTool || !inputTextArea.value) {
        outputTextArea.value = '';
        return;
    }
    
    const text = inputTextArea.value;
    let result = '';
    
    switch (currentTool) {
        case 'uppercase':
            result = text.toUpperCase();
            break;
            
        case 'lowercase':
            result = text.toLowerCase();
            break;
            
        case 'titlecase':
            result = toTitleCase(text);
            break;
            
        case 'sentencecase':
            result = toSentenceCase(text);
            break;
            
        case 'wordcount':
            result = getWordCount(text);
            break;
            
        case 'reverse':
            result = text.split('').reverse().join('');
            break;
            
        case 'removespaces':
            result = text.replace(/\s+/g, ' ').trim();
            break;
            
        case 'removebreaks':
            result = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            break;
            
        case 'removeduplicates':
            result = removeDuplicateLines(text);
            break;
            
        case 'sortlines':
            result = sortLines(text);
            break;
            
        case 'randomline':
            result = getRandomLines(text);
            break;
            
        case 'encode':
            result = urlEncodeDecode(text);
            break;
            
        case 'base64':
            result = base64EncodeDecode(text);
            break;
            
        case 'html':
            result = htmlEncodeDecode(text);
            break;
            
        case 'ascii':
            result = textToAscii(text);
            break;
            
        case 'diff':
            result = compareTexts(text);
            break;
            
        case 'stats':
            result = getTextStatistics(text);
            break;
            
        case 'findreplace':
            result = findAndReplace(text);
            break;
            
        case 'textcleaner':
            result = cleanText(text);
            break;
            
        case 'smartformatter':
            result = smartFormat(text);
            break;
            
        case 'wordfrequency':
            result = analyzeWordFrequency(text);
            break;
            
        case 'readability':
            result = calculateReadability(text);
            break;
            
        case 'jsonformatter':
            result = formatJSON(text);
            break;
            
        case 'htmlminifier':
            result = minifyHTML(text);
            break;
            
        case 'regextester':
            result = testRegex(text);
            break;
            
        case 'charfrequency':
            result = analyzeCharFrequency(text);
            break;
            
        case 'keyworddensity':
            result = checkKeywordDensity(text);
            break;
            
        case 'metatag':
            result = generateMetaTags(text);
            break;
            
        case 'titleoptimizer':
            result = optimizeTitleDescription(text);
            break;
            
        case 'grammar':
            result = checkGrammar(text);
            break;
            
        case 'plagiarism':
            result = checkPlagiarism(text);
            break;
            
        case 'xmltojson':
            result = convertXmlToJson(text);
            break;
            
        case 'urlencoder':
            result = advancedUrlEncodeDecode(text);
            break;
            
        case 'cssminifier':
            result = minifyCSS(text);
            break;
            
        case 'jsbeautifier':
            result = beautifyJavaScript(text);
            break;
            
        case 'colorconverter':
            result = convertColorCodes(text);
            break;
            
        case 'hashgenerator':
            result = generateHashes(text);
            break;
            
        default:
            result = text;
    }
    
    outputTextArea.value = result;
}

// Tool-specific functions
function toTitleCase(text) {
    return text.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function toSentenceCase(text) {
    return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => {
        return c.toUpperCase();
    });
}

function getWordCount(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const lines = text.split('\n').length;
    
    return `Words: ${words.length}
Characters: ${characters}
Characters (no spaces): ${charactersNoSpaces}
Paragraphs: ${paragraphs}
Lines: ${lines}
Average words per sentence: ${(words.length / (text.split(/[.!?]+/).length - 1) || 0).toFixed(1)}`;
}

function removeDuplicateLines(text) {
    const lines = text.split('\n');
    const uniqueLines = [...new Set(lines)];
    return uniqueLines.join('\n');
}

function sortLines(text) {
    const order = document.getElementById('sort-order')?.value || 'asc';
    const lines = text.split('\n');
    
    if (order === 'desc') {
        lines.sort((a, b) => b.localeCompare(a));
    } else {
        lines.sort((a, b) => a.localeCompare(b));
    }
    
    return lines.join('\n');
}

function getRandomLines(text) {
    const count = parseInt(document.getElementById('random-count')?.value) || 1;
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    
    if (lines.length === 0) return '';
    
    const randomLines = [];
    for (let i = 0; i < Math.min(count, lines.length); i++) {
        const randomIndex = Math.floor(Math.random() * lines.length);
        randomLines.push(lines[randomIndex]);
        lines.splice(randomIndex, 1);
    }
    
    return randomLines.join('\n');
}

function urlEncodeDecode(text) {
    const action = document.getElementById('encode-action')?.value || 'encode';
    
    try {
        if (action === 'encode') {
            return encodeURIComponent(text);
        } else {
            return decodeURIComponent(text);
        }
    } catch (e) {
        return 'Error: Invalid input for decoding';
    }
}

function base64EncodeDecode(text) {
    const action = document.getElementById('base64-action')?.value || 'encode';
    
    try {
        if (action === 'encode') {
            return btoa(unescape(encodeURIComponent(text)));
        } else {
            return decodeURIComponent(escape(atob(text)));
        }
    } catch (e) {
        return 'Error: Invalid Base64 input';
    }
}

function htmlEncodeDecode(text) {
    const action = document.getElementById('html-action')?.value || 'encode';
    
    if (action === 'encode') {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    } else {
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");
    }
}

function textToAscii(text) {
    // Simple ASCII art conversion (basic implementation)
    const asciiMap = {
        'A': ['  █  ', ' █ █ ', '█████', '█   █', '█   █'],
        'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
        'C': [' ████', '█    ', '█    ', '█    ', ' ████'],
        'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
        'E': ['█████', '█    ', '███  ', '█    ', '█████'],
        'F': ['█████', '█    ', '███  ', '█    ', '█    '],
        'G': [' ████', '█    ', '█ ███', '█   █', ' ████'],
        'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
        'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
        'J': ['█████', '    █', '    █', '█   █', ' ████'],
        'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
        'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
        'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
        'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
        'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
        'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
        'Q': [' ███ ', '█   █', '█ █ █', '█  ██', ' ████'],
        'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
        'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
        'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
        'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
        'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
        'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
        'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
        'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
        'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
        ' ': ['     ', '     ', '     ', '     ', '     ']
    };
    
    const lines = ['', '', '', '', ''];
    const upperText = text.toUpperCase().substring(0, 10); // Limit length
    
    for (let char of upperText) {
        const pattern = asciiMap[char] || asciiMap[' '];
        for (let i = 0; i < 5; i++) {
            lines[i] += pattern[i] + ' ';
        }
    }
    
    return lines.join('\n');
}

function compareTexts(text1) {
    const text2 = document.getElementById('text2')?.value || '';
    
    if (!text2) {
        return 'Please enter text in the second text area to compare.';
    }
    
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    
    let result = 'Differences found:\n\n';
    let differences = 0;
    
    for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        
        if (line1 !== line2) {
            differences++;
            result += `Line ${i + 1}:\n`;
            result += `Text 1: "${line1}"\n`;
            result += `Text 2: "${line2}"\n\n`;
        }
    }
    
    if (differences === 0) {
        result = 'No differences found. The texts are identical.';
    } else {
        result = `Found ${differences} difference(s):\n\n` + result;
    }
    
    return result;
}

function getTextStatistics(text) {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    
    // Word frequency
    const wordFreq = {};
    words.forEach(word => {
        const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
        wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    });
    
    const sortedWords = Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    // Character frequency
    const charFreq = {};
    for (let char of text.toLowerCase()) {
        if (char.match(/[a-z]/)) {
            charFreq[char] = (charFreq[char] || 0) + 1;
        }
    }
    
    const avgWordsPerSentence = sentences.length > 0 ? (words.length / sentences.length).toFixed(1) : 0;
    const avgCharsPerWord = words.length > 0 ? (text.replace(/\s/g, '').length / words.length).toFixed(1) : 0;
    
    let result = `=== TEXT STATISTICS ===\n\n`;
    result += `Basic Counts:\n`;
    result += `• Words: ${words.length}\n`;
    result += `• Characters: ${text.length}\n`;
    result += `• Characters (no spaces): ${text.replace(/\s/g, '').length}\n`;
    result += `• Sentences: ${sentences.length}\n`;
    result += `• Paragraphs: ${paragraphs.length}\n`;
    result += `• Lines: ${text.split('\n').length}\n\n`;
    
    result += `Averages:\n`;
    result += `• Words per sentence: ${avgWordsPerSentence}\n`;
    result += `• Characters per word: ${avgCharsPerWord}\n\n`;
    
    result += `Top 10 Most Frequent Words:\n`;
    sortedWords.forEach(([word, count], index) => {
        result += `${index + 1}. "${word}" - ${count} times\n`;
    });
    
    return result;
}

function findAndReplace(text) {
    const findText = document.getElementById('find-text')?.value || '';
    const replaceText = document.getElementById('replace-text')?.value || '';
    const caseSensitive = document.getElementById('case-sensitive')?.checked || false;
    const regexMode = document.getElementById('regex-mode')?.checked || false;
    
    if (!findText) {
        return text;
    }
    
    try {
        if (regexMode) {
            const flags = caseSensitive ? 'g' : 'gi';
            const regex = new RegExp(findText, flags);
            return text.replace(regex, replaceText);
        } else {
            const flags = caseSensitive ? 'g' : 'gi';
            const regex = new RegExp(escapeRegExp(findText), flags);
            return text.replace(regex, replaceText);
        }
    } catch (e) {
        return 'Error: Invalid regular expression';
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// New Smart Text Tools Functions

function cleanText(text) {
    const removeExtraSpaces = document.getElementById('remove-extra-spaces')?.checked || false;
    const removeLineBreaks = document.getElementById('remove-line-breaks')?.checked || false;
    const removeSpecialChars = document.getElementById('remove-special-chars')?.checked || false;
    const trimLines = document.getElementById('trim-lines')?.checked || false;
    
    let result = text;
    
    if (trimLines) {
        result = result.split('\n').map(line => line.trim()).join('\n');
    }
    
    if (removeExtraSpaces) {
        result = result.replace(/[ \t]+/g, ' ');
    }
    
    if (removeLineBreaks) {
        result = result.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
    }
    
    if (removeSpecialChars) {
        result = result.replace(/[^\w\s]/g, '');
    }
    
    return result;
}

function smartFormat(text) {
    const autoCapitalize = document.getElementById('auto-capitalize')?.checked || false;
    const fixPunctuation = document.getElementById('fix-punctuation')?.checked || false;
    const properNouns = document.getElementById('proper-nouns')?.checked || false;
    const fixSpacing = document.getElementById('fix-spacing')?.checked || false;
    
    let result = text;
    
    if (fixSpacing) {
        result = result.replace(/\s+/g, ' ').trim();
        result = result.replace(/\s+([.!?])/g, '$1');
        result = result.replace(/([.!?])\s*/g, '$1 ');
    }
    
    if (autoCapitalize) {
        result = result.replace(/(^|[.!?]\s+)([a-z])/g, (match, p1, p2) => p1 + p2.toUpperCase());
    }
    
    if (fixPunctuation) {
        result = result.replace(/([a-z])([A-Z])/g, '$1. $2');
        result = result.replace(/\s+([.!?])/g, '$1');
    }
    
    if (properNouns) {
        const properNounsList = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
                                'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        properNounsList.forEach(noun => {
            const regex = new RegExp('\\b' + noun + '\\b', 'gi');
            result = result.replace(regex, noun.charAt(0).toUpperCase() + noun.slice(1));
        });
    }
    
    return result;
}

function analyzeWordFrequency(text) {
    const minWordLength = parseInt(document.getElementById('min-word-length')?.value) || 3;
    const caseInsensitive = document.getElementById('case-insensitive')?.checked || false;
    const ignoreCommon = document.getElementById('ignore-common')?.checked || false;
    
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'];
    
    let words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    if (caseInsensitive) {
        words = words.map(word => word.toLowerCase());
    }
    
    words = words.filter(word => word.length >= minWordLength);
    
    if (ignoreCommon) {
        words = words.filter(word => !commonWords.includes(word.toLowerCase()));
    }
    
    const frequency = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });
    
    const sortedWords = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    
    let result = `Word Frequency Analysis\n`;
    result += `========================\n\n`;
    result += `Total words analyzed: ${words.length}\n`;
    result += `Unique words: ${sortedWords.length}\n`;
    result += `Minimum word length: ${minWordLength}\n\n`;
    
    result += `Top Word Frequencies:\n`;
    result += `---------------------\n`;
    sortedWords.slice(0, 20).forEach(([word, count], index) => {
        const percentage = ((count / words.length) * 100).toFixed(2);
        result += `${index + 1}. "${word}" - ${count} times (${percentage}%)\n`;
    });
    
    return result;
}

function calculateReadability(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.match(/\b\w+\b/g) || [];
    const syllables = words.reduce((total, word) => total + countSyllables(word), 0);
    
    const avgWordsPerSentence = words.length / sentences.length || 0;
    const avgSyllablesPerWord = syllables / words.length || 0;
    
    // Flesch Reading Ease Score
    const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    
    // Flesch-Kincaid Grade Level
    const gradeLevel = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
    
    let readingLevel = '';
    if (fleschScore >= 90) readingLevel = 'Very Easy (5th grade)';
    else if (fleschScore >= 80) readingLevel = 'Easy (6th grade)';
    else if (fleschScore >= 70) readingLevel = 'Fairly Easy (7th grade)';
    else if (fleschScore >= 60) readingLevel = 'Standard (8th-9th grade)';
    else if (fleschScore >= 50) readingLevel = 'Fairly Difficult (10th-12th grade)';
    else if (fleschScore >= 30) readingLevel = 'Difficult (College level)';
    else readingLevel = 'Very Difficult (Graduate level)';
    
    let result = `Readability Analysis\n`;
    result += `===================\n\n`;
    result += `Text Statistics:\n`;
    result += `• Sentences: ${sentences.length}\n`;
    result += `• Words: ${words.length}\n`;
    result += `• Syllables: ${syllables}\n`;
    result += `• Average words per sentence: ${avgWordsPerSentence.toFixed(2)}\n`;
    result += `• Average syllables per word: ${avgSyllablesPerWord.toFixed(2)}\n\n`;
    result += `Readability Scores:\n`;
    result += `• Flesch Reading Ease: ${fleschScore.toFixed(1)}\n`;
    result += `• Reading Level: ${readingLevel}\n`;
    result += `• Flesch-Kincaid Grade Level: ${Math.max(0, gradeLevel).toFixed(1)}\n`;
    
    return result;
}

function countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
}

function formatJSON(text) {
    const action = document.getElementById('json-action')?.value || 'format';
    const indentSize = parseInt(document.getElementById('indent-size')?.value) || 2;
    
    try {
        const parsed = JSON.parse(text);
        
        switch (action) {
            case 'format':
                return JSON.stringify(parsed, null, indentSize);
            case 'minify':
                return JSON.stringify(parsed);
            case 'validate':
                return 'Valid JSON ✓\n\nFormatted:\n' + JSON.stringify(parsed, null, indentSize);
            default:
                return JSON.stringify(parsed, null, indentSize);
        }
    } catch (error) {
        return `Invalid JSON ✗\n\nError: ${error.message}`;
    }
}

function minifyHTML(text) {
    const action = document.getElementById('html-minify-action')?.value || 'minify';
    const removeComments = document.getElementById('remove-comments')?.checked || false;
    const removeWhitespace = document.getElementById('remove-whitespace')?.checked || false;
    
    let result = text;
    
    if (action === 'minify') {
        if (removeComments) {
            result = result.replace(/<!--[\s\S]*?-->/g, '');
        }
        if (removeWhitespace) {
            result = result.replace(/>\s+</g, '><');
            result = result.replace(/\s+/g, ' ');
            result = result.trim();
        }
    } else if (action === 'beautify') {
        // Simple beautification
        result = result.replace(/></g, '>\n<');
        result = result.replace(/^\s+|\s+$/gm, '');
        
        // Add indentation
        const lines = result.split('\n');
        let indent = 0;
        const indentSize = 2;
        
        result = lines.map(line => {
            if (line.includes('</') && !line.includes('</'+ line.match(/<\/(\w+)/)?.[1] + '>')) {
                indent -= indentSize;
            }
            const indentedLine = ' '.repeat(Math.max(0, indent)) + line.trim();
            if (line.includes('<') && !line.includes('</') && !line.includes('/>')) {
                indent += indentSize;
            }
            return indentedLine;
        }).join('\n');
    }
    
    return result;
}

function testRegex(text) {
    const pattern = document.getElementById('regex-pattern')?.value || '';
    const flags = document.getElementById('regex-flags')?.value || 'g';
    const showGroups = document.getElementById('show-groups')?.checked || false;
    
    if (!pattern) {
        return 'Please enter a regex pattern to test.';
    }
    
    try {
        const regex = new RegExp(pattern, flags);
        const matches = [...text.matchAll(regex)];
        
        let result = `Regex Test Results\n`;
        result += `==================\n\n`;
        result += `Pattern: ${pattern}\n`;
        result += `Flags: ${flags}\n`;
        result += `Total matches: ${matches.length}\n\n`;
        
        if (matches.length > 0) {
            result += `Matches:\n`;
            result += `--------\n`;
            matches.forEach((match, index) => {
                result += `${index + 1}. "${match[0]}" at position ${match.index}\n`;
                if (showGroups && match.length > 1) {
                    for (let i = 1; i < match.length; i++) {
                        result += `   Group ${i}: "${match[i] || ''}"\n`;
                    }
                }
            });
        } else {
            result += `No matches found.`;
        }
        
        return result;
    } catch (error) {
        return `Invalid regex pattern: ${error.message}`;
    }
}

function analyzeCharFrequency(text) {
    const includeSpaces = document.getElementById('include-spaces')?.checked || false;
    const caseSensitive = document.getElementById('case-sensitive-chars')?.checked || false;
    const showPercentages = document.getElementById('show-percentages')?.checked || false;
    
    let chars = text.split('');
    
    if (!includeSpaces) {
        chars = chars.filter(char => char !== ' ');
    }
    
    if (!caseSensitive) {
        chars = chars.map(char => char.toLowerCase());
    }
    
    const frequency = {};
    chars.forEach(char => {
        frequency[char] = (frequency[char] || 0) + 1;
    });
    
    const sortedChars = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
    
    let result = `Character Frequency Analysis\n`;
    result += `============================\n\n`;
    result += `Total characters: ${chars.length}\n`;
    result += `Unique characters: ${sortedChars.length}\n`;
    result += `Include spaces: ${includeSpaces ? 'Yes' : 'No'}\n`;
    result += `Case sensitive: ${caseSensitive ? 'Yes' : 'No'}\n\n`;
    
    result += `Character Frequencies:\n`;
    result += `----------------------\n`;
    sortedChars.forEach(([char, count], index) => {
        const displayChar = char === ' ' ? '[SPACE]' : char === '\n' ? '[NEWLINE]' : char === '\t' ? '[TAB]' : char;
        const percentage = showPercentages ? ` (${((count / chars.length) * 100).toFixed(2)}%)` : '';
        result += `${index + 1}. "${displayChar}" - ${count} times${percentage}\n`;
    });
    
    return result;
}

// SEO & Writing Utilities Functions

function checkKeywordDensity(text) {
    const targetKeyword = document.getElementById('target-keyword')?.value || '';
    const minKeywordLength = parseInt(document.getElementById('min-keyword-length')?.value) || 2;
    const caseInsensitive = document.getElementById('case-insensitive-keywords')?.checked || false;
    const showPositions = document.getElementById('show-keyword-positions')?.checked || false;
    
    if (!targetKeyword.trim()) {
        return 'Please enter a target keyword to analyze.';
    }
    
    const words = text.match(/\b\w+\b/g) || [];
    const totalWords = words.length;
    
    let searchText = caseInsensitive ? text.toLowerCase() : text;
    let searchKeyword = caseInsensitive ? targetKeyword.toLowerCase() : targetKeyword;
    
    // Count exact matches
    const exactMatches = (searchText.match(new RegExp('\\b' + escapeRegExp(searchKeyword) + '\\b', 'g')) || []).length;
    
    // Count partial matches (words containing the keyword)
    const partialMatches = words.filter(word => {
        const searchWord = caseInsensitive ? word.toLowerCase() : word;
        return searchWord.includes(searchKeyword) && searchWord !== searchKeyword;
    }).length;
    
    const density = totalWords > 0 ? ((exactMatches / totalWords) * 100).toFixed(2) : 0;
    
    let result = `Keyword Density Analysis\n`;
    result += `========================\n\n`;
    result += `Target Keyword: "${targetKeyword}"\n`;
    result += `Total Words: ${totalWords}\n`;
    result += `Exact Matches: ${exactMatches}\n`;
    result += `Partial Matches: ${partialMatches}\n`;
    result += `Keyword Density: ${density}%\n\n`;
    
    // SEO recommendations
    result += `SEO Recommendations:\n`;
    result += `--------------------\n`;
    if (density < 0.5) {
        result += `• Density is too low. Consider adding more instances of "${targetKeyword}"\n`;
    } else if (density > 3) {
        result += `• Density is too high. Risk of keyword stuffing. Consider reducing usage.\n`;
    } else {
        result += `• Keyword density is within optimal range (0.5% - 3%)\n`;
    }
    
    if (showPositions && exactMatches > 0) {
        result += `\nKeyword Positions:\n`;
        result += `------------------\n`;
        const regex = new RegExp('\\b' + escapeRegExp(searchKeyword) + '\\b', caseInsensitive ? 'gi' : 'g');
        let match;
        let position = 1;
        while ((match = regex.exec(searchText)) !== null) {
            result += `${position}. Position ${match.index}\n`;
            position++;
        }
    }
    
    return result;
}

function generateMetaTags(text) {
    const pageTitle = document.getElementById('page-title')?.value || '';
    const metaDescription = document.getElementById('meta-description')?.value || '';
    const metaKeywords = document.getElementById('meta-keywords')?.value || '';
    const authorName = document.getElementById('author-name')?.value || '';
    const robotsDirective = document.getElementById('robots-directive')?.value || 'index,follow';
    
    let result = `Generated Meta Tags\n`;
    result += `==================\n\n`;
    result += `Copy and paste these meta tags into your HTML <head> section:\n\n`;
    
    // Basic meta tags
    result += `<!-- Basic Meta Tags -->\n`;
    result += `<meta charset="UTF-8">\n`;
    result += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    
    if (pageTitle) {
        result += `<title>${pageTitle}</title>\n`;
        result += `<meta property="og:title" content="${pageTitle}">\n`;
    }
    
    if (metaDescription) {
        result += `<meta name="description" content="${metaDescription}">\n`;
        result += `<meta property="og:description" content="${metaDescription}">\n`;
    }
    
    if (metaKeywords) {
        result += `<meta name="keywords" content="${metaKeywords}">\n`;
    }
    
    if (authorName) {
        result += `<meta name="author" content="${authorName}">\n`;
    }
    
    result += `<meta name="robots" content="${robotsDirective}">\n\n`;
    
    // Open Graph tags
    result += `<!-- Open Graph Meta Tags -->\n`;
    result += `<meta property="og:type" content="website">\n`;
    result += `<meta property="og:url" content="https://yourwebsite.com">\n`;
    result += `<meta property="og:site_name" content="Your Site Name">\n\n`;
    
    // Twitter Card tags
    result += `<!-- Twitter Card Meta Tags -->\n`;
    result += `<meta name="twitter:card" content="summary_large_image">\n`;
    result += `<meta name="twitter:site" content="@yourtwitterhandle">\n`;
    
    if (pageTitle) {
        result += `<meta name="twitter:title" content="${pageTitle}">\n`;
    }
    
    if (metaDescription) {
        result += `<meta name="twitter:description" content="${metaDescription}">\n`;
    }
    
    result += `\n<!-- Analysis -->\n`;
    if (pageTitle) {
        result += `Title Length: ${pageTitle.length} characters ${pageTitle.length > 60 ? '(Too long - recommended max 60)' : '(Good)'}\n`;
    }
    if (metaDescription) {
        result += `Description Length: ${metaDescription.length} characters ${metaDescription.length > 160 ? '(Too long - recommended max 160)' : '(Good)'}\n`;
    }
    
    return result;
}

function optimizeTitleDescription(text) {
    const seoTitle = document.getElementById('seo-title')?.value || '';
    const seoDescription = document.getElementById('seo-description')?.value || '';
    const focusKeyword = document.getElementById('focus-keyword')?.value || '';
    
    let result = `SEO Title & Description Analysis\n`;
    result += `=================================\n\n`;
    
    // Title Analysis
    if (seoTitle) {
        result += `Title Analysis:\n`;
        result += `---------------\n`;
        result += `Title: "${seoTitle}"\n`;
        result += `Length: ${seoTitle.length} characters\n`;
        
        if (seoTitle.length < 30) {
            result += `Status: Too short (recommended: 50-60 characters)\n`;
        } else if (seoTitle.length > 60) {
            result += `Status: Too long (may be truncated in search results)\n`;
        } else {
            result += `Status: Good length ✓\n`;
        }
        
        if (focusKeyword && seoTitle.toLowerCase().includes(focusKeyword.toLowerCase())) {
            result += `Focus keyword present: ✓\n`;
        } else if (focusKeyword) {
            result += `Focus keyword missing: Consider adding "${focusKeyword}"\n`;
        }
        result += `\n`;
    }
    
    // Description Analysis
    if (seoDescription) {
        result += `Meta Description Analysis:\n`;
        result += `--------------------------\n`;
        result += `Description: "${seoDescription}"\n`;
        result += `Length: ${seoDescription.length} characters\n`;
        
        if (seoDescription.length < 120) {
            result += `Status: Too short (recommended: 150-160 characters)\n`;
        } else if (seoDescription.length > 160) {
            result += `Status: Too long (may be truncated in search results)\n`;
        } else {
            result += `Status: Good length ✓\n`;
        }
        
        if (focusKeyword && seoDescription.toLowerCase().includes(focusKeyword.toLowerCase())) {
            result += `Focus keyword present: ✓\n`;
        } else if (focusKeyword) {
            result += `Focus keyword missing: Consider adding "${focusKeyword}"\n`;
        }
        result += `\n`;
    }
    
    // Recommendations
    result += `SEO Recommendations:\n`;
    result += `--------------------\n`;
    result += `• Include your focus keyword near the beginning of the title\n`;
    result += `• Make titles compelling and click-worthy\n`;
    result += `• Write unique titles and descriptions for each page\n`;
    result += `• Include a call-to-action in meta descriptions\n`;
    result += `• Use power words like "Best", "Ultimate", "Complete", "Free"\n`;
    result += `• Avoid keyword stuffing\n`;
    
    return result;
}

function checkGrammar(text) {
    const checkSpelling = document.getElementById('check-spelling')?.checked || false;
    const checkGrammar = document.getElementById('check-grammar')?.checked || false;
    const suggestImprovements = document.getElementById('suggest-improvements')?.checked || false;
    
    let result = `Grammar & Style Analysis\n`;
    result += `========================\n\n`;
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.match(/\b\w+\b/g) || [];
    const avgWordsPerSentence = words.length / sentences.length || 0;
    
    result += `Text Statistics:\n`;
    result += `• Sentences: ${sentences.length}\n`;
    result += `• Words: ${words.length}\n`;
    result += `• Average words per sentence: ${avgWordsPerSentence.toFixed(1)}\n\n`;
    
    let issues = [];
    
    if (checkSpelling) {
        // Basic spelling checks (common mistakes)
        const commonMistakes = {
            'teh': 'the',
            'adn': 'and',
            'recieve': 'receive',
            'seperate': 'separate',
            'definately': 'definitely',
            'occured': 'occurred',
            'neccessary': 'necessary'
        };
        
        Object.keys(commonMistakes).forEach(mistake => {
            if (text.toLowerCase().includes(mistake)) {
                issues.push(`Possible spelling error: "${mistake}" → "${commonMistakes[mistake]}"`);
            }
        });
    }
    
    if (checkGrammar) {
        // Basic grammar checks
        if (text.includes(' i ') || text.startsWith('i ')) {
            issues.push('Consider capitalizing "I" when used as a pronoun');
        }
        
        if (text.match(/\s{2,}/)) {
            issues.push('Multiple consecutive spaces found');
        }
        
        if (avgWordsPerSentence > 25) {
            issues.push('Some sentences may be too long (>25 words average)');
        }
    }
    
    if (suggestImprovements) {
        // Style suggestions
        const passiveVoiceIndicators = ['was', 'were', 'been', 'being'];
        const passiveCount = passiveVoiceIndicators.reduce((count, indicator) => {
            return count + (text.toLowerCase().match(new RegExp('\\b' + indicator + '\\b', 'g')) || []).length;
        }, 0);
        
        if (passiveCount > words.length * 0.1) {
            issues.push('Consider reducing passive voice usage');
        }
        
        const weakWords = ['very', 'really', 'quite', 'rather', 'somewhat'];
        weakWords.forEach(word => {
            if (text.toLowerCase().includes(word)) {
                issues.push(`Consider replacing weak modifier: "${word}"`);
            }
        });
    }
    
    if (issues.length > 0) {
        result += `Issues Found:\n`;
        result += `-------------\n`;
        issues.forEach((issue, index) => {
            result += `${index + 1}. ${issue}\n`;
        });
    } else {
        result += `No major issues found! ✓\n`;
    }
    
    result += `\nNote: This is a basic grammar checker. For comprehensive checking, consider using professional tools like Grammarly or ProWritingAid.`;
    
    return result;
}

function checkPlagiarism(text) {
    const minMatchLength = parseInt(document.getElementById('min-match-length')?.value) || 5;
    const ignoreCommon = document.getElementById('ignore-common-phrases')?.checked || false;
    const caseSensitive = document.getElementById('case-sensitive-plagiarism')?.checked || false;
    
    let result = `Plagiarism Analysis\n`;
    result += `==================\n\n`;
    result += `Note: This is a basic text similarity analyzer, not a comprehensive plagiarism detector.\n`;
    result += `For thorough plagiarism checking, use professional tools like Turnitin or Copyscape.\n\n`;
    
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.match(/\b\w+\b/g) || [];
    
    result += `Text Analysis:\n`;
    result += `• Total sentences: ${sentences.length}\n`;
    result += `• Total words: ${words.length}\n`;
    result += `• Minimum match length: ${minMatchLength} words\n\n`;
    
    // Check for repeated phrases within the text
    const phrases = [];
    for (let i = 0; i <= words.length - minMatchLength; i++) {
        const phrase = words.slice(i, i + minMatchLength).join(' ');
        const searchPhrase = caseSensitive ? phrase : phrase.toLowerCase();
        phrases.push(searchPhrase);
    }
    
    const phraseCount = {};
    phrases.forEach(phrase => {
        phraseCount[phrase] = (phraseCount[phrase] || 0) + 1;
    });
    
    const duplicates = Object.entries(phraseCount).filter(([phrase, count]) => count > 1);
    
    if (duplicates.length > 0) {
        result += `Repeated Phrases Found:\n`;
        result += `----------------------\n`;
        duplicates.forEach(([phrase, count]) => {
            if (!ignoreCommon || !isCommonPhrase(phrase)) {
                result += `"${phrase}" - appears ${count} times\n`;
            }
        });
    } else {
        result += `No repeated phrases found within the text.\n`;
    }
    
    result += `\nRecommendations:\n`;
    result += `• Use professional plagiarism checkers for academic or professional work\n`;
    result += `• Always cite sources properly\n`;
    result += `• Paraphrase content and add original insights\n`;
    result += `• Use quotation marks for direct quotes\n`;
    
    return result;
}

function isCommonPhrase(phrase) {
    const commonPhrases = [
        'in order to', 'as well as', 'in addition to', 'on the other hand',
        'in conclusion', 'for example', 'such as', 'in fact', 'in other words'
    ];
    return commonPhrases.some(common => phrase.includes(common));
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Coding & Developer Tools Functions

function convertXmlToJson(text) {
    const prettyPrint = document.getElementById('pretty-print-json')?.checked || false;
    const preserveAttributes = document.getElementById('preserve-attributes')?.checked || false;
    const arrayNotation = document.getElementById('array-notation')?.checked || false;
    
    try {
        // Basic XML to JSON conversion (simplified)
        let result = `XML to JSON Conversion\n`;
        result += `=====================\n\n`;
        
        if (!text.trim()) {
            return 'Please enter XML content to convert.';
        }
        
        // Remove XML declaration and comments
        let cleanXml = text.replace(/<\?xml[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '').trim();
        
        if (!cleanXml.startsWith('<') || !cleanXml.includes('>')) {
            return 'Invalid XML format. Please enter valid XML content.';
        }
        
        // Simple XML parsing (basic implementation)
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(cleanXml, 'text/xml');
        
        if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
            return 'XML parsing error. Please check your XML syntax.';
        }
        
        function xmlToJsonObject(node) {
            let obj = {};
            
            // Handle attributes
            if (preserveAttributes && node.attributes && node.attributes.length > 0) {
                obj['@attributes'] = {};
                for (let i = 0; i < node.attributes.length; i++) {
                    const attr = node.attributes[i];
                    obj['@attributes'][attr.name] = attr.value;
                }
            }
            
            // Handle child nodes
            if (node.childNodes.length > 0) {
                for (let i = 0; i < node.childNodes.length; i++) {
                    const child = node.childNodes[i];
                    
                    if (child.nodeType === 3) { // Text node
                        const text = child.textContent.trim();
                        if (text) {
                            if (Object.keys(obj).length === 0) {
                                return text;
                            } else {
                                obj['#text'] = text;
                            }
                        }
                    } else if (child.nodeType === 1) { // Element node
                        const childObj = xmlToJsonObject(child);
                        
                        if (obj[child.nodeName]) {
                            if (!Array.isArray(obj[child.nodeName])) {
                                obj[child.nodeName] = [obj[child.nodeName]];
                            }
                            obj[child.nodeName].push(childObj);
                        } else {
                            obj[child.nodeName] = arrayNotation ? [childObj] : childObj;
                        }
                    }
                }
            }
            
            return obj;
        }
        
        const jsonObj = xmlToJsonObject(xmlDoc.documentElement);
        const finalObj = {};
        finalObj[xmlDoc.documentElement.nodeName] = jsonObj;
        
        const jsonString = prettyPrint ? 
            JSON.stringify(finalObj, null, 2) : 
            JSON.stringify(finalObj);
        
        result += `Converted JSON:\n`;
        result += `${jsonString}\n\n`;
        result += `Conversion Options:\n`;
        result += `• Pretty Print: ${prettyPrint ? 'Yes' : 'No'}\n`;
        result += `• Preserve Attributes: ${preserveAttributes ? 'Yes' : 'No'}\n`;
        result += `• Array Notation: ${arrayNotation ? 'Yes' : 'No'}\n`;
        
        return result;
        
    } catch (error) {
        return `Error converting XML to JSON: ${error.message}`;
    }
}

function advancedUrlEncodeDecode(text) {
    const operation = document.querySelector('input[name="url-operation"]:checked')?.value || 'encode';
    const encodeComponents = document.getElementById('encode-components')?.checked || false;
    const showUrlParts = document.getElementById('show-url-parts')?.checked || false;
    
    let result = `URL ${operation === 'encode' ? 'Encoding' : 'Decoding'} Results\n`;
    result += `${'='.repeat(result.length - 1)}\n\n`;
    
    try {
        if (operation === 'encode') {
            if (encodeComponents) {
                // Try to parse as URL and encode components separately
                try {
                    const url = new URL(text);
                    result += `Component-wise Encoding:\n`;
                    result += `• Protocol: ${url.protocol}\n`;
                    result += `• Host: ${url.hostname}\n`;
                    result += `• Port: ${url.port || 'default'}\n`;
                    result += `• Path: ${encodeURIComponent(url.pathname)}\n`;
                    result += `• Query: ${encodeURIComponent(url.search)}\n`;
                    result += `• Fragment: ${encodeURIComponent(url.hash)}\n\n`;
                    
                    const encodedUrl = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}${encodeURIComponent(url.pathname)}${encodeURIComponent(url.search)}${encodeURIComponent(url.hash)}`;
                    result += `Full Encoded URL:\n${encodedUrl}\n\n`;
                } catch {
                    result += `Full URL Encoding:\n${encodeURIComponent(text)}\n\n`;
                }
            } else {
                result += `Encoded Text:\n${encodeURIComponent(text)}\n\n`;
            }
            
            result += `Alternative Encodings:\n`;
            result += `• encodeURI(): ${encodeURI(text)}\n`;
            result += `• encodeURIComponent(): ${encodeURIComponent(text)}\n`;
            
        } else {
            result += `Decoded Text:\n${decodeURIComponent(text)}\n\n`;
            
            try {
                result += `Alternative Decoding:\n`;
                result += `• decodeURI(): ${decodeURI(text)}\n`;
            } catch (e) {
                result += `• decodeURI(): Error - ${e.message}\n`;
            }
        }
        
        if (showUrlParts && text.includes('://')) {
            try {
                const url = new URL(operation === 'decode' ? decodeURIComponent(text) : text);
                result += `\nURL Parts Breakdown:\n`;
                result += `• Protocol: ${url.protocol}\n`;
                result += `• Hostname: ${url.hostname}\n`;
                result += `• Port: ${url.port || 'default'}\n`;
                result += `• Pathname: ${url.pathname}\n`;
                result += `• Search: ${url.search}\n`;
                result += `• Hash: ${url.hash}\n`;
                result += `• Origin: ${url.origin}\n`;
            } catch (e) {
                result += `\nURL parsing failed: ${e.message}\n`;
            }
        }
        
    } catch (error) {
        result += `Error: ${error.message}`;
    }
    
    return result;
}

function minifyCSS(text) {
    const removeComments = document.getElementById('remove-comments')?.checked || false;
    const removeWhitespace = document.getElementById('remove-whitespace')?.checked || false;
    const optimizeColors = document.getElementById('optimize-colors')?.checked || false;
    const mergeRules = document.getElementById('merge-rules')?.checked || false;
    
    let result = `CSS Minification Results\n`;
    result += `========================\n\n`;
    
    let minified = text;
    let originalSize = text.length;
    
    if (removeComments) {
        // Remove CSS comments
        minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');
    }
    
    if (removeWhitespace) {
        // Remove unnecessary whitespace
        minified = minified
            .replace(/\s+/g, ' ')  // Multiple spaces to single
            .replace(/\s*{\s*/g, '{')  // Spaces around {
            .replace(/\s*}\s*/g, '}')  // Spaces around }
            .replace(/\s*;\s*/g, ';')  // Spaces around ;
            .replace(/\s*:\s*/g, ':')  // Spaces around :
            .replace(/\s*,\s*/g, ',')  // Spaces around ,
            .trim();
    }
    
    if (optimizeColors) {
        // Optimize color codes
        minified = minified
            .replace(/#([0-9a-fA-F])\1([0-9a-fA-F])\2([0-9a-fA-F])\3/g, '#$1$2$3')  // #aabbcc to #abc
            .replace(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g, (match, r, g, b) => {
                // Convert rgb to hex if shorter
                const hex = '#' + [r, g, b].map(x => {
                    const hex = parseInt(x).toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                }).join('');
                return hex.length <= match.length ? hex : match;
            });
    }
    
    if (mergeRules) {
        // Basic rule merging (simplified)
        const rules = {};
        const ruleRegex = /([^{]+)\{([^}]+)\}/g;
        let match;
        
        while ((match = ruleRegex.exec(minified)) !== null) {
            const selector = match[1].trim();
            const properties = match[2].trim();
            
            if (rules[properties]) {
                rules[properties] += ',' + selector;
            } else {
                rules[properties] = selector;
            }
        }
        
        // Rebuild CSS with merged rules
        let merged = '';
        Object.entries(rules).forEach(([properties, selectors]) => {
            merged += `${selectors}{${properties}}`;
        });
        
        if (merged.length < minified.length) {
            minified = merged;
        }
    }
    
    const minifiedSize = minified.length;
    const savings = originalSize - minifiedSize;
    const percentage = originalSize > 0 ? ((savings / originalSize) * 100).toFixed(1) : 0;
    
    result += `Minified CSS:\n`;
    result += `${minified}\n\n`;
    result += `Optimization Results:\n`;
    result += `• Original size: ${originalSize} characters\n`;
    result += `• Minified size: ${minifiedSize} characters\n`;
    result += `• Size reduction: ${savings} characters (${percentage}%)\n\n`;
    result += `Options applied:\n`;
    result += `• Remove comments: ${removeComments ? 'Yes' : 'No'}\n`;
    result += `• Remove whitespace: ${removeWhitespace ? 'Yes' : 'No'}\n`;
    result += `• Optimize colors: ${optimizeColors ? 'Yes' : 'No'}\n`;
    result += `• Merge rules: ${mergeRules ? 'Yes' : 'No'}\n`;
    
    return result;
}

function beautifyJavaScript(text) {
    const indentSize = document.getElementById('indent-size')?.value || '4';
    const preserveNewlines = document.getElementById('preserve-newlines')?.checked || false;
    const spaceBeforeConditional = document.getElementById('space-before-conditional')?.checked || false;
    
    let result = `JavaScript Beautification Results\n`;
    result += `=================================\n\n`;
    
    let beautified = text;
    let indentChar = indentSize === 'tab' ? '\t' : ' '.repeat(parseInt(indentSize));
    let currentIndent = 0;
    
    try {
        // Basic JavaScript beautification
        beautified = beautified
            .replace(/\s+/g, ' ')  // Normalize whitespace
            .replace(/;/g, ';\n')  // Line breaks after semicolons
            .replace(/{/g, ' {\n')  // Line breaks after opening braces
            .replace(/}/g, '\n}\n')  // Line breaks around closing braces
            .replace(/,/g, ',\n');  // Line breaks after commas in objects/arrays
        
        // Apply indentation
        const lines = beautified.split('\n');
        const indentedLines = [];
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (trimmed === '') {
                if (preserveNewlines) {
                    indentedLines.push('');
                }
                return;
            }
            
            // Decrease indent for closing braces
            if (trimmed.startsWith('}')) {
                currentIndent = Math.max(0, currentIndent - 1);
            }
            
            // Add indentation
            indentedLines.push(indentChar.repeat(currentIndent) + trimmed);
            
            // Increase indent for opening braces
            if (trimmed.endsWith('{')) {
                currentIndent++;
            }
        });
        
        beautified = indentedLines.join('\n');
        
        if (spaceBeforeConditional) {
            beautified = beautified
                .replace(/if\(/g, 'if (')
                .replace(/for\(/g, 'for (')
                .replace(/while\(/g, 'while (')
                .replace(/switch\(/g, 'switch (');
        }
        
        // Clean up extra newlines
        beautified = beautified.replace(/\n{3,}/g, '\n\n');
        
        result += `Beautified JavaScript:\n`;
        result += `${beautified}\n\n`;
        result += `Formatting Options:\n`;
        result += `• Indent: ${indentSize === 'tab' ? 'Tab' : indentSize + ' spaces'}\n`;
        result += `• Preserve newlines: ${preserveNewlines ? 'Yes' : 'No'}\n`;
        result += `• Space before conditionals: ${spaceBeforeConditional ? 'Yes' : 'No'}\n`;
        
    } catch (error) {
        result += `Error beautifying JavaScript: ${error.message}`;
    }
    
    return result;
}

function convertColorCodes(text) {
    const inputFormat = document.getElementById('input-color-format')?.value || 'auto';
    const showAllFormats = document.getElementById('show-all-formats')?.checked || false;
    const showColorPreview = document.getElementById('show-color-preview')?.checked || false;
    
    let result = `Color Code Conversion\n`;
    result += `====================\n\n`;
    
    const colorInput = text.trim();
    
    if (!colorInput) {
        return 'Please enter a color code to convert.';
    }
    
    let r, g, b, h, s, l;
    let detectedFormat = 'unknown';
    
    try {
        // Auto-detect or parse based on format
        if (inputFormat === 'auto' || inputFormat === 'hex') {
            const hexMatch = colorInput.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
            if (hexMatch) {
                detectedFormat = 'hex';
                let hex = hexMatch[1];
                if (hex.length === 3) {
                    hex = hex.split('').map(c => c + c).join('');
                }
                r = parseInt(hex.substr(0, 2), 16);
                g = parseInt(hex.substr(2, 2), 16);
                b = parseInt(hex.substr(4, 2), 16);
            }
        }
        
        if ((inputFormat === 'auto' || inputFormat === 'rgb') && detectedFormat === 'unknown') {
            const rgbMatch = colorInput.match(/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
            if (rgbMatch) {
                detectedFormat = 'rgb';
                r = parseInt(rgbMatch[1]);
                g = parseInt(rgbMatch[2]);
                b = parseInt(rgbMatch[3]);
            }
        }
        
        if ((inputFormat === 'auto' || inputFormat === 'hsl') && detectedFormat === 'unknown') {
            const hslMatch = colorInput.match(/hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
            if (hslMatch) {
                detectedFormat = 'hsl';
                h = parseInt(hslMatch[1]);
                s = parseInt(hslMatch[2]);
                l = parseInt(hslMatch[3]);
                
                // Convert HSL to RGB
                const hslToRgb = (h, s, l) => {
                    h /= 360; s /= 100; l /= 100;
                    const a = s * Math.min(l, 1 - l);
                    const f = n => {
                        const k = (n + h / (1/12)) % 12;
                        return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                    };
                    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
                };
                [r, g, b] = hslToRgb(h, s, l);
            }
        }
        
        if (detectedFormat === 'unknown') {
            return `Could not detect color format. Supported formats:\n• HEX: #FF0000 or #F00\n• RGB: rgb(255, 0, 0)\n• HSL: hsl(0, 100%, 50%)`;
        }
        
        // Convert RGB to HSL if not already HSL
        if (detectedFormat !== 'hsl') {
            const rgbToHsl = (r, g, b) => {
                r /= 255; g /= 255; b /= 255;
                const max = Math.max(r, g, b), min = Math.min(r, g, b);
                let h, s, l = (max + min) / 2;
                
                if (max === min) {
                    h = s = 0;
                } else {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                        case g: h = (b - r) / d + 2; break;
                        case b: h = (r - g) / d + 4; break;
                    }
                    h /= 6;
                }
                return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
            };
            [h, s, l] = rgbToHsl(r, g, b);
        }
        
        result += `Input: ${colorInput} (${detectedFormat.toUpperCase()})\n\n`;
        
        if (showAllFormats) {
            result += `All Color Formats:\n`;
            result += `• HEX: #${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()}\n`;
            result += `• RGB: rgb(${r}, ${g}, ${b})\n`;
            result += `• HSL: hsl(${h}, ${s}%, ${l}%)\n`;
            result += `• RGB Decimal: ${r}, ${g}, ${b}\n`;
            result += `• RGB Percentage: ${Math.round(r/255*100)}%, ${Math.round(g/255*100)}%, ${Math.round(b/255*100)}%\n\n`;
        } else {
            // Show primary conversion
            if (detectedFormat === 'hex') {
                result += `RGB: rgb(${r}, ${g}, ${b})\n`;
                result += `HSL: hsl(${h}, ${s}%, ${l}%)\n`;
            } else if (detectedFormat === 'rgb') {
                result += `HEX: #${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()}\n`;
                result += `HSL: hsl(${h}, ${s}%, ${l}%)\n`;
            } else {
                result += `HEX: #${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()}\n`;
                result += `RGB: rgb(${r}, ${g}, ${b})\n`;
            }
        }
        
        if (showColorPreview) {
            result += `\nColor Preview:\n`;
            result += `█████████████████████████\n`;
            result += `█████████████████████████\n`;
            result += `█████████████████████████\n`;
            result += `Note: Color preview shown as blocks. In a browser, this would be: rgb(${r}, ${g}, ${b})\n`;
        }
        
    } catch (error) {
        result += `Error converting color: ${error.message}`;
    }
    
    return result;
}

function generateHashes(text) {
    const algorithm = document.getElementById('hash-algorithm')?.value || 'sha256';
    const uppercaseHash = document.getElementById('uppercase-hash')?.checked || false;
    const includeLength = document.getElementById('include-length')?.checked || false;
    
    let result = `Hash Generation Results\n`;
    result += `=======================\n\n`;
    
    if (!text.trim()) {
        return 'Please enter text to generate hashes.';
    }
    
    try {
        // Note: This is a simplified implementation
        // In a real application, you'd use the Web Crypto API or a crypto library
        
        const generateSimpleHash = (str, type) => {
            let hash = 0;
            if (str.length === 0) return hash.toString(16);
            
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            
            // Simulate different hash lengths
            let hashStr = Math.abs(hash).toString(16);
            switch (type) {
                case 'md5':
                    hashStr = hashStr.padStart(32, '0').substr(0, 32);
                    break;
                case 'sha1':
                    hashStr = hashStr.padStart(40, '0').substr(0, 40);
                    break;
                case 'sha256':
                    hashStr = hashStr.padStart(64, '0').substr(0, 64);
                    break;
            }
            
            return uppercaseHash ? hashStr.toUpperCase() : hashStr;
        };
        
        result += `Input text: "${text}"\n`;
        result += `Text length: ${text.length} characters\n\n`;
        
        if (algorithm === 'all') {
            const algorithms = ['md5', 'sha1', 'sha256'];
            algorithms.forEach(algo => {
                const hash = generateSimpleHash(text, algo);
                result += `${algo.toUpperCase()}:\n${hash}\n`;
                if (includeLength) {
                    result += `Length: ${hash.length} characters\n`;
                }
                result += `\n`;
            });
        } else {
            const hash = generateSimpleHash(text, algorithm);
            result += `${algorithm.toUpperCase()} Hash:\n${hash}\n`;
            if (includeLength) {
                result += `Hash length: ${hash.length} characters\n`;
            }
        }
        
        result += `\nNote: This is a demonstration hash generator. For production use, implement proper cryptographic hashing using Web Crypto API or a dedicated crypto library.\n`;
        
        result += `\nOptions:\n`;
        result += `• Algorithm: ${algorithm === 'all' ? 'All algorithms' : algorithm.toUpperCase()}\n`;
        result += `• Uppercase: ${uppercaseHash ? 'Yes' : 'No'}\n`;
        result += `• Include length: ${includeLength ? 'Yes' : 'No'}\n`;
        
    } catch (error) {
        result += `Error generating hash: ${error.message}`;
    }
    
    return result;
}

// Special generators
function generatePassword() {
    const length = parseInt(document.getElementById('password-length')?.value) || 12;
    const includeUpper = document.getElementById('include-uppercase')?.checked || false;
    const includeLower = document.getElementById('include-lowercase')?.checked || false;
    const includeNumbers = document.getElementById('include-numbers')?.checked || false;
    const includeSymbols = document.getElementById('include-symbols')?.checked || false;
    
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!charset) {
        outputTextArea.value = 'Please select at least one character type.';
        return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    outputTextArea.value = password;
}

function generateLorem() {
    const paragraphs = parseInt(document.getElementById('lorem-paragraphs')?.value) || 3;
    
    const loremWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];
    
    let result = '';
    
    for (let p = 0; p < paragraphs; p++) {
        const sentenceCount = Math.floor(Math.random() * 5) + 3; // 3-7 sentences per paragraph
        let paragraph = '';
        
        for (let s = 0; s < sentenceCount; s++) {
            const wordCount = Math.floor(Math.random() * 10) + 5; // 5-14 words per sentence
            let sentence = '';
            
            for (let w = 0; w < wordCount; w++) {
                const word = loremWords[Math.floor(Math.random() * loremWords.length)];
                sentence += (w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word) + ' ';
            }
            
            paragraph += sentence.trim() + '. ';
        }
        
        result += paragraph.trim() + '\n\n';
    }
    
    outputTextArea.value = result.trim();
}

// Utility functions
function copyOutput() {
    outputTextArea.select();
    outputTextArea.setSelectionRange(0, 99999);
    
    try {
        document.execCommand('copy');
        showMessage('Text copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(outputTextArea.value).then(() => {
            showMessage('Text copied to clipboard!', 'success');
        }).catch(() => {
            showMessage('Failed to copy text', 'error');
        });
    }
}

function clearAll() {
    inputTextArea.value = '';
    outputTextArea.value = '';
    inputText = '';
    outputText = '';
    
    // Clear tool-specific controls
    const controls = toolControls.querySelectorAll('input, select, textarea');
    controls.forEach(control => {
        if (control.type === 'checkbox') {
            control.checked = false;
        } else {
            control.value = '';
        }
    });
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default for Web3Forms - let it submit naturally
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Re-enable button after a delay (in case of errors)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
        });
    }
});

// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.contact-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const message = document.createElement('div');
    message.className = `contact-message message ${type}`;
    message.textContent = text;
    
    // Insert message after the form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.parentNode.insertBefore(message, contactForm.nextSibling);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

function showMessage(text, type) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Scroll to top functionality
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observe tool cards
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'Enter':
                if (currentTool) {
                    processText();
                }
                break;
            case 'c':
                if (e.shiftKey && outputTextArea.value) {
                    e.preventDefault();
                    copyOutput();
                }
                break;
            case 'Escape':
                if (currentTool) {
                    e.preventDefault();
                    closeTool();
                }
                break;
        }
    }
});

// Performance optimization - debounce text processing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to text processing for better performance
const debouncedProcessText = debounce(processText, 300);

// Update the input event listener to use debounced function
inputTextArea.addEventListener('input', function() {
    inputText = this.value;
    debouncedProcessText();
});

// FAQ Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
});

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Smooth scroll to FAQ section when FAQ nav link is clicked
    const faqNavLink = document.querySelector('a[href="#faq"]');
    if (faqNavLink) {
        faqNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            const faqSection = document.getElementById('faq');
            if (faqSection) {
                faqSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}