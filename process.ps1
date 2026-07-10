$content = Get-Content -Raw "samku-theme\front-page.php"
$parts = $content -split "<!-- Hero Section -->"
$header = $parts[0]
$rest = "<!-- Hero Section -->" + $parts[1]

$restParts = $rest -split "<!-- Footer -->"
$body = $restParts[0]
$footer = "<!-- Footer -->" + $restParts[1]

# Modify header.php
$header = $header -replace '<link rel="stylesheet".*>', '<?php wp_head(); ?>'
$header = $header -replace '<link rel="preconnect".*>', ''
$header = $header -replace '<link href="https://fonts.*>', ''
$header = $header -replace '<title>.*</title>', ''
$header = $header -replace 'src="samkulogo', 'src="<?php echo get_template_directory_uri(); ?>/assets/samkulogo'
$header = $header -replace 'href="samkulogo', 'href="<?php echo get_template_directory_uri(); ?>/assets/samkulogo'
$header = $header -replace '<body>', '<body <?php body_class(); ?>>'
Set-Content "samku-theme\header.php" $header

# Modify footer.php
$footer = $footer -replace 'src="samkulogo', 'src="<?php echo get_template_directory_uri(); ?>/assets/samkulogo'
$footer = $footer -replace 'src="Saudi_Vision', 'src="<?php echo get_template_directory_uri(); ?>/assets/Saudi_Vision'
$footer = $footer -replace '<!-- Scripts -->\s*<script src="script.js"></script>', '<?php wp_footer(); ?>'
Set-Content "samku-theme\footer.php" $footer

# Modify front-page.php body
$body = $body -replace 'src="([^h][^t][^t][^p].*?\.(jpg|png|svg))"', 'src="<?php echo get_template_directory_uri(); ?>/assets/$1"'
$body = "<?php get_header(); ?>`n" + $body + "`n<?php get_footer(); ?>"
Set-Content "samku-theme\front-page.php" $body

# Do the same for Arabic
$contentAr = Get-Content -Raw "samku-theme\template-arabic.php"
$partsAr = $contentAr -split "<!-- Hero Section -->"
$headerAr = $partsAr[0]
$restAr = "<!-- Hero Section -->" + $partsAr[1]

$restPartsAr = $restAr -split "<!-- Footer -->"
$bodyAr = $restPartsAr[0]
$footerAr = "<!-- Footer -->" + $restPartsAr[1]

$headerAr = $headerAr -replace '<link rel="stylesheet".*>', '<?php wp_head(); ?>'
$headerAr = $headerAr -replace '<link rel="preconnect".*>', ''
$headerAr = $headerAr -replace '<link href="https://fonts.*>', ''
$headerAr = $headerAr -replace '<title>.*</title>', ''
$headerAr = $headerAr -replace 'src="samkulogo', 'src="<?php echo get_template_directory_uri(); ?>/assets/samkulogo'
$headerAr = $headerAr -replace 'href="samkulogo', 'href="<?php echo get_template_directory_uri(); ?>/assets/samkulogo'
$headerAr = $headerAr -replace '<body>', '<body <?php body_class(); ?>>'
Set-Content "samku-theme\header-ar.php" $headerAr

$footerAr = $footerAr -replace 'src="samkulogo', 'src="<?php echo get_template_directory_uri(); ?>/assets/samkulogo'
$footerAr = $footerAr -replace 'src="Saudi_Vision', 'src="<?php echo get_template_directory_uri(); ?>/assets/Saudi_Vision'
$footerAr = $footerAr -replace '<!-- Scripts -->\s*<script src="script.js"></script>', '<?php wp_footer(); ?>'
Set-Content "samku-theme\footer-ar.php" $footerAr

$bodyAr = $bodyAr -replace 'src="([^h][^t][^t][^p].*?\.(jpg|png|svg))"', 'src="<?php echo get_template_directory_uri(); ?>/assets/$1"'
$bodyAr = "<?php`n/* Template Name: Arabic Homepage */`nget_header('ar');`n?>`n" + $bodyAr + "`n<?php get_footer('ar'); ?>"
Set-Content "samku-theme\template-arabic.php" $bodyAr

# Fix style.css urls and add theme header
$styleContent = Get-Content -Raw "samku-theme\style.css"
$styleContent = $styleContent -replace "url\('([^h][^t][^t][^p].*?\.(jpg|png|svg))'\)", "url('assets/`$1')"
$themeHeader = "/*`nTheme Name: Samku Theme`nAuthor: Sparkwings Innovations`nDescription: Custom WordPress theme for Samku International.`nVersion: 1.0`n*/`n`n"
$styleContent = $themeHeader + $styleContent
Set-Content "samku-theme\style.css" $styleContent
