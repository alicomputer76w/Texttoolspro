# PowerShell script to add FAQ schema markup to remaining tool pages (Batch 2)

# Define the remaining tool pages and their FAQ content
$toolPages = @{
    "js-beautifier.html" = @{
        "toolName" = "JavaScript Beautifier"
        "usage" = "To use the JavaScript Beautifier: 1) Paste your minified or messy JavaScript code in the input area, 2) Choose formatting options (indentation, line breaks, spacing), 3) Click 'Beautify JS' button, 4) Copy the formatted, readable JavaScript code. The tool makes code easier to read and debug."
        "questions" = @(
            @{
                "question" = "What is JavaScript beautification?"
                "answer" = "JavaScript beautification formats minified or poorly formatted JS code by adding proper indentation, line breaks, and spacing to make it human-readable and easier to debug."
            },
            @{
                "question" = "Can it format ES6+ and modern JavaScript?"
                "answer" = "Yes, the JavaScript Beautifier supports all modern JavaScript features including ES6+, arrow functions, async/await, destructuring, and template literals."
            },
            @{
                "question" = "Does beautification change code functionality?"
                "answer" = "No, beautification only changes formatting and whitespace. Your JavaScript code will function exactly the same but be much more readable."
            },
            @{
                "question" = "Is the JavaScript beautifier free?"
                "answer" = "Yes, the JavaScript Beautifier is completely free to use with no limitations on code size or number of uses."
            }
        )
    }
    "keyword-density.html" = @{
        "toolName" = "Keyword Density Analyzer"
        "usage" = "To use the Keyword Density Analyzer: 1) Paste your text or webpage content in the input area, 2) Click 'Analyze Keywords' button, 3) View the keyword density percentages and frequency counts, 4) Use the results to optimize your content for SEO. The tool shows how often keywords appear relative to total word count."
        "questions" = @(
            @{
                "question" = "What is keyword density and why is it important?"
                "answer" = "Keyword density is the percentage of times a keyword appears in text relative to the total word count. It's important for SEO optimization and ensuring natural keyword usage."
            },
            @{
                "question" = "What's the ideal keyword density for SEO?"
                "answer" = "Generally, 1-3% keyword density is considered optimal for SEO. Higher densities may be seen as keyword stuffing, while lower densities might not provide enough relevance signals."
            },
            @{
                "question" = "Does the tool analyze phrases and long-tail keywords?"
                "answer" = "Yes, the Keyword Density Analyzer can analyze both single keywords and multi-word phrases, helping you optimize for long-tail keywords and key phrases."
            },
            @{
                "question" = "Is the keyword density tool free?"
                "answer" = "Yes, the Keyword Density Analyzer is completely free to use with unlimited text analysis and no registration required."
            }
        )
    }
    "meta-tag-generator.html" = @{
        "toolName" = "Meta Tag Generator"
        "usage" = "To use the Meta Tag Generator: 1) Fill in your webpage details (title, description, keywords, author), 2) Add Open Graph and Twitter Card information for social media, 3) Click 'Generate Meta Tags' button, 4) Copy the generated HTML meta tags and paste them in your webpage's <head> section. The tool creates SEO-optimized meta tags."
        "questions" = @(
            @{
                "question" = "What meta tags does the generator create?"
                "answer" = "The Meta Tag Generator creates essential tags including title, description, keywords, viewport, Open Graph tags for Facebook, Twitter Card tags, and other SEO-important meta tags."
            },
            @{
                "question" = "Why are meta tags important for SEO?"
                "answer" = "Meta tags help search engines understand your webpage content, improve search result appearance, and control how your page appears when shared on social media platforms."
            },
            @{
                "question" = "Can I customize the generated meta tags?"
                "answer" = "Yes, the tool allows you to customize all meta tag values including title length, description content, keywords, and social media preview information."
            },
            @{
                "question" = "Is the meta tag generator free?"
                "answer" = "Yes, the Meta Tag Generator is completely free to use with unlimited meta tag generation and no restrictions."
            }
        )
    }
    "plagiarism-checker.html" = @{
        "toolName" = "Plagiarism Checker"
        "usage" = "To use the Plagiarism Checker: 1) Paste your text in the input area, 2) Click 'Check for Plagiarism' button, 3) Review the analysis results showing potential matches, 4) Check highlighted sections that may need citation or revision. The tool helps ensure content originality."
        "questions" = @(
            @{
                "question" = "How does the plagiarism checker work?"
                "answer" = "The Plagiarism Checker analyzes your text for potential matches with existing content, highlighting sections that may be similar to published material and need proper citation."
            },
            @{
                "question" = "What types of plagiarism can it detect?"
                "answer" = "The tool can detect various types of plagiarism including direct copying, paraphrasing without citation, and mosaic plagiarism where multiple sources are combined."
            },
            @{
                "question" = "Is my content secure when using this tool?"
                "answer" = "Yes, all plagiarism checking happens locally in your browser. Your content is never stored or transmitted to external servers, ensuring complete privacy."
            },
            @{
                "question" = "Is the plagiarism checker free?"
                "answer" = "Yes, the Plagiarism Checker is free to use with no limits on text length or number of checks."
            }
        )
    }
    "readability-score.html" = @{
        "toolName" = "Readability Score Calculator"
        "usage" = "To use the Readability Score Calculator: 1) Paste your text in the input area, 2) Click 'Calculate Readability' button, 3) View multiple readability scores (Flesch-Kincaid, Gunning Fog, SMOG), 4) Use the results to adjust your writing for the target audience. The tool helps optimize text difficulty."
        "questions" = @(
            @{
                "question" = "What readability formulas does the tool use?"
                "answer" = "The Readability Score Calculator uses multiple formulas including Flesch-Kincaid Grade Level, Gunning Fog Index, SMOG Index, and Automated Readability Index for comprehensive analysis."
            },
            @{
                "question" = "What do the readability scores mean?"
                "answer" = "Readability scores indicate the education level needed to understand your text. Lower scores mean easier reading, while higher scores indicate more complex, academic-level content."
            },
            @{
                "question" = "How can I improve my text's readability?"
                "answer" = "To improve readability, use shorter sentences, simpler words, active voice, and break up long paragraphs. The tool provides specific suggestions for improvement."
            },
            @{
                "question" = "Is the readability calculator free?"
                "answer" = "Yes, the Readability Score Calculator is completely free to use with unlimited text analysis and detailed scoring."
            }
        )
    }
    "regex-tester.html" = @{
        "toolName" = "Regex Tester"
        "usage" = "To use the Regex Tester: 1) Enter your regular expression pattern in the regex field, 2) Paste your test text in the input area, 3) Choose regex flags (global, case-insensitive, multiline), 4) Click 'Test Regex' to see matches highlighted, 5) View match groups and capture results. The tool helps debug and validate regex patterns."
        "questions" = @(
            @{
                "question" = "What regex features does the tester support?"
                "answer" = "The Regex Tester supports all standard regex features including character classes, quantifiers, anchors, groups, lookaheads, and common flags like global and case-insensitive matching."
            },
            @{
                "question" = "Can I test regex for different programming languages?"
                "answer" = "Yes, the tool supports JavaScript regex syntax which is compatible with most programming languages, and you can test patterns for various use cases."
            },
            @{
                "question" = "Does it show capture groups and match details?"
                "answer" = "Yes, the Regex Tester displays all matches, capture groups, and detailed information about each match including position and captured text."
            },
            @{
                "question" = "Is the regex tester free to use?"
                "answer" = "Yes, the Regex Tester is completely free with unlimited pattern testing and no restrictions on complexity."
            }
        )
    }
    "smart-formatter.html" = @{
        "toolName" = "Smart Text Formatter"
        "usage" = "To use the Smart Text Formatter: 1) Paste your text in the input area, 2) Choose formatting options (case conversion, line spacing, paragraph formatting), 3) Click 'Format Text' button, 4) Copy the formatted text. The tool applies intelligent formatting rules to improve text presentation."
        "questions" = @(
            @{
                "question" = "What formatting options are available?"
                "answer" = "The Smart Text Formatter offers case conversion (uppercase, lowercase, title case), line spacing adjustment, paragraph formatting, bullet point creation, and text alignment options."
            },
            @{
                "question" = "Can it format different types of documents?"
                "answer" = "Yes, the tool works with various text types including essays, reports, lists, emails, and other documents, applying appropriate formatting rules for each."
            },
            @{
                "question" = "Does it preserve important formatting?"
                "answer" = "The Smart Text Formatter intelligently preserves important elements like proper nouns, acronyms, and special formatting while improving overall text presentation."
            },
            @{
                "question" = "Is the smart formatter free?"
                "answer" = "Yes, the Smart Text Formatter is completely free to use with unlimited formatting operations and no usage restrictions."
            }
        )
    }
    "title-optimizer.html" = @{
        "toolName" = "Title Optimizer"
        "usage" = "To use the Title Optimizer: 1) Enter your title or headline in the input field, 2) Click 'Optimize Title' button, 3) Review SEO analysis including length, keyword usage, and readability, 4) View suggestions for improvement, 5) Copy the optimized title. The tool helps create SEO-friendly, engaging titles."
        "questions" = @(
            @{
                "question" = "What makes a title SEO-optimized?"
                "answer" = "An SEO-optimized title includes relevant keywords, stays within 50-60 characters, is compelling to users, and accurately describes the content while encouraging clicks."
            },
            @{
                "question" = "How does the tool analyze title effectiveness?"
                "answer" = "The Title Optimizer analyzes character count, keyword placement, emotional impact, readability, and provides suggestions based on SEO best practices and user engagement factors."
            },
            @{
                "question" = "Can it optimize titles for different platforms?"
                "answer" = "Yes, the tool can optimize titles for search engines, social media platforms, email subject lines, and other contexts with platform-specific recommendations."
            },
            @{
                "question" = "Is the title optimizer free?"
                "answer" = "Yes, the Title Optimizer is completely free to use with unlimited title analysis and optimization suggestions."
            }
        )
    }
    "url-encoder.html" = @{
        "toolName" = "URL Encoder/Decoder"
        "usage" = "To use the URL Encoder/Decoder: 1) Paste your URL or text in the input area, 2) Choose to encode or decode, 3) Click the appropriate button (Encode URL or Decode URL), 4) Copy the processed result. The tool handles special characters and ensures URLs are web-safe."
        "questions" = @(
            @{
                "question" = "When do I need to encode URLs?"
                "answer" = "URL encoding is needed when URLs contain special characters, spaces, or non-ASCII characters that aren't allowed in web addresses. It converts them to percent-encoded format."
            },
            @{
                "question" = "What characters does URL encoding handle?"
                "answer" = "URL encoding handles spaces, special characters (&, ?, #, %), international characters, and any character that has special meaning in URLs or isn't web-safe."
            },
            @{
                "question" = "Can I decode already encoded URLs?"
                "answer" = "Yes, the tool can decode percent-encoded URLs back to their original readable format, making it easy to understand what the encoded URL represents."
            },
            @{
                "question" = "Is the URL encoder/decoder free?"
                "answer" = "Yes, the URL Encoder/Decoder is completely free to use with unlimited encoding and decoding operations."
            }
        )
    }
    "xml-to-json.html" = @{
        "toolName" = "XML to JSON Converter"
        "usage" = "To use the XML to JSON Converter: 1) Paste your XML data in the input area, 2) Click 'Convert to JSON' button, 3) View the converted JSON output, 4) Copy the JSON data for use in your applications. The tool preserves data structure while converting between formats."
        "questions" = @(
            @{
                "question" = "How does XML to JSON conversion work?"
                "answer" = "The converter parses XML structure and transforms it into equivalent JSON format, converting XML elements to JSON objects and XML attributes to JSON properties while preserving data hierarchy."
            },
            @{
                "question" = "Does it handle XML attributes and namespaces?"
                "answer" = "Yes, the XML to JSON Converter properly handles XML attributes, namespaces, and complex nested structures, ensuring accurate data conversion."
            },
            @{
                "question" = "Can I convert JSON back to XML?"
                "answer" = "Yes, the tool supports bidirectional conversion, allowing you to convert JSON data back to XML format while maintaining proper structure."
            },
            @{
                "question" = "Is the XML to JSON converter free?"
                "answer" = "Yes, the XML to JSON Converter is completely free to use with no limitations on file size or conversion frequency."
            }
        )
    }
    "age_calculator.html" = @{
        "toolName" = "Age Calculator"
        "usage" = "To use the Age Calculator: 1) Enter your birth date using the date picker or manual input, 2) Click 'Calculate Age' button, 3) View your exact age in years, months, and days, 4) See additional information like days until next birthday and total days lived. The tool provides precise age calculations."
        "questions" = @(
            @{
                "question" = "How accurate is the age calculation?"
                "answer" = "The Age Calculator is extremely accurate, accounting for leap years, different month lengths, and providing exact age down to the day level with precise calculations."
            },
            @{
                "question" = "Can I calculate age for any date?"
                "answer" = "Yes, you can calculate age for any birth date, and the tool also shows how many days until the next birthday and other useful date-related information."
            },
            @{
                "question" = "Does it work with different date formats?"
                "answer" = "Yes, the Age Calculator accepts various date formats and includes a user-friendly date picker for easy date selection."
            },
            @{
                "question" = "Is the age calculator free to use?"
                "answer" = "Yes, the Age Calculator is completely free to use with unlimited calculations and no registration required."
            }
        )
    }
}

# Function to add FAQ schema to a file
function Add-FAQSchema {
    param(
        [string]$filePath,
        [hashtable]$faqData
    )
    
    $content = Get-Content $filePath -Raw
    
    # Check if FAQ schema already exists
    if ($content -match "<!-- FAQ Schema -->") {
        Write-Host "FAQ schema already exists in $filePath, skipping..."
        return
    }
    
    # Create FAQ schema JSON
    $faqSchema = @"
    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I use the $($faqData.toolName) tool?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "$($faqData.usage)"
                }
            }
"@

    # Add additional questions
    foreach ($q in $faqData.questions) {
        $faqSchema += @"
,
            {
                "@type": "Question",
                "name": "$($q.question)",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "$($q.answer)"
                }
            }
"@
    }
    
    $faqSchema += @"

        ]
    }
    </script>
"@

    # Find the position to insert FAQ schema (before </head>)
    $headCloseIndex = $content.IndexOf("</head>")
    if ($headCloseIndex -gt 0) {
        $newContent = $content.Substring(0, $headCloseIndex) + $faqSchema + "`n" + $content.Substring($headCloseIndex)
        Set-Content $filePath $newContent -Encoding UTF8
        Write-Host "Added FAQ schema to $filePath"
    } else {
        Write-Host "Could not find </head> tag in $filePath"
    }
}

# Process each tool page
foreach ($page in $toolPages.Keys) {
    $fullPath = "f:\Text_Tools_20\$page"
    if (Test-Path $fullPath) {
        Add-FAQSchema -filePath $fullPath -faqData $toolPages[$page]
    } else {
        Write-Host "File not found: $fullPath"
    }
}

Write-Host "FAQ schema addition completed for batch 2 pages."