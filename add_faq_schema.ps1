# PowerShell script to add FAQ schema markup to all tool pages

# Define the tool pages and their FAQ content
$toolPages = @{
    "character-frequency.html" = @{
        "toolName" = "Character Frequency Analyzer"
        "usage" = "To use the Character Frequency Analyzer: 1) Paste or type your text in the input area, 2) Click 'Analyze Characters' button, 3) View the frequency chart showing how often each character appears, 4) Use the results for text analysis, cryptography, or linguistic studies. The tool counts all characters including letters, numbers, and symbols."
        "questions" = @(
            @{
                "question" = "What is character frequency analysis?"
                "answer" = "Character frequency analysis counts how often each character appears in a text. It's useful for cryptography, linguistics, data compression, and understanding text patterns."
            },
            @{
                "question" = "Does the tool count spaces and punctuation?"
                "answer" = "Yes, the Character Frequency Analyzer counts all characters including spaces, punctuation marks, numbers, and special symbols, giving you a complete character distribution."
            },
            @{
                "question" = "Can I analyze text in different languages?"
                "answer" = "Absolutely! The tool works with any language and character set including English, Chinese, Arabic, Russian, and other Unicode characters."
            },
            @{
                "question" = "Is the character frequency tool free?"
                "answer" = "Yes, the Character Frequency Analyzer is completely free to use with no limitations on text length or number of analyses."
            }
        )
    }
    "color-converter.html" = @{
        "toolName" = "Color Converter"
        "usage" = "To use the Color Converter: 1) Enter a color value in any format (HEX, RGB, HSL, HSV), 2) The tool automatically converts to all other formats, 3) Copy the converted values you need, 4) Use the color picker for visual selection. The tool supports all major color formats and provides instant conversion."
        "questions" = @(
            @{
                "question" = "What color formats does the converter support?"
                "answer" = "The Color Converter supports HEX, RGB, RGBA, HSL, HSLA, HSV, HSB, and CSS color names. It converts between all these formats instantly."
            },
            @{
                "question" = "Can I use the color picker to select colors?"
                "answer" = "Yes, the tool includes a visual color picker that lets you select colors by clicking and automatically shows the values in all supported formats."
            },
            @{
                "question" = "Does the tool validate color values?"
                "answer" = "Yes, the Color Converter validates input values and shows errors for invalid color codes, ensuring you get accurate conversions."
            },
            @{
                "question" = "Is the color converter free to use?"
                "answer" = "Yes, the Color Converter is completely free with unlimited conversions and no registration required."
            }
        )
    }
    "grammar-helper.html" = @{
        "toolName" = "Grammar Helper"
        "usage" = "To use the Grammar Helper: 1) Paste or type your text in the input area, 2) Click 'Check Grammar' button, 3) Review highlighted grammar errors and suggestions, 4) Click on suggestions to apply corrections, 5) Copy the corrected text. The tool identifies common grammar mistakes and provides improvement suggestions."
        "questions" = @(
            @{
                "question" = "What types of grammar errors does it detect?"
                "answer" = "The Grammar Helper detects common errors including subject-verb agreement, tense consistency, punctuation mistakes, sentence fragments, and word usage issues."
            },
            @{
                "question" = "Can it help with writing style improvements?"
                "answer" = "Yes, beyond grammar errors, the tool suggests improvements for clarity, conciseness, and readability to enhance your writing style."
            },
            @{
                "question" = "Does it work with different types of writing?"
                "answer" = "The Grammar Helper works with various writing types including essays, emails, reports, creative writing, and academic papers."
            },
            @{
                "question" = "Is the grammar checking tool free?"
                "answer" = "Yes, the Grammar Helper is free to use with no limits on text length or number of checks."
            }
        )
    }
    "hash-generator.html" = @{
        "toolName" = "Hash Generator"
        "usage" = "To use the Hash Generator: 1) Enter your text or data in the input field, 2) Select the hash algorithm (MD5, SHA-1, SHA-256, SHA-512), 3) Click 'Generate Hash' button, 4) Copy the generated hash value. The tool creates secure hash values for data integrity verification and security purposes."
        "questions" = @(
            @{
                "question" = "What hash algorithms are supported?"
                "answer" = "The Hash Generator supports MD5, SHA-1, SHA-256, SHA-512, and other popular cryptographic hash functions for various security needs."
            },
            @{
                "question" = "What are hash values used for?"
                "answer" = "Hash values are used for data integrity verification, password storage, digital signatures, file checksums, and blockchain applications."
            },
            @{
                "question" = "Are the generated hashes secure?"
                "answer" = "Yes, the tool uses standard cryptographic algorithms. SHA-256 and SHA-512 are recommended for security-critical applications."
            },
            @{
                "question" = "Is the hash generator free to use?"
                "answer" = "Yes, the Hash Generator is completely free with unlimited hash generation and supports all major hash algorithms."
            }
        )
    }
    "html-minifier.html" = @{
        "toolName" = "HTML Minifier"
        "usage" = "To use the HTML Minifier: 1) Paste your HTML code in the input area, 2) Choose minification options (remove comments, whitespace, empty attributes), 3) Click 'Minify HTML' button, 4) Copy the minified HTML code. The tool reduces file size while preserving functionality."
        "questions" = @(
            @{
                "question" = "What does HTML minification remove?"
                "answer" = "HTML minification removes unnecessary whitespace, comments, empty attributes, and redundant code while preserving the structure and functionality of your HTML."
            },
            @{
                "question" = "Does minification affect HTML functionality?"
                "answer" = "No, HTML minification only removes unnecessary characters and formatting. Your HTML will work exactly the same but load faster."
            },
            @{
                "question" = "Can I minify HTML with inline CSS and JavaScript?"
                "answer" = "Yes, the HTML Minifier can handle HTML files containing inline CSS and JavaScript, optimizing the entire document."
            },
            @{
                "question" = "Is the HTML minifier free?"
                "answer" = "Yes, the HTML Minifier is completely free to use with no file size limits or usage restrictions."
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

Write-Host "FAQ schema addition completed for specified pages."