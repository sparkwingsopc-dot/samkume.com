<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/samkulogo-removebg-preview.png">
    
    <!-- Google Fonts -->
    
    
    
    
    <!-- Font Awesome -->
    <?php wp_head(); ?>
    
    <!-- Custom CSS -->
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="container nav-container">
            <a href="#" class="logo-link">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/samkulogo-removebg-preview.png" alt="Samku International Logo" class="logo">
            </a>
            <div class="nav-links">
                <a href="#home" class="nav-link active">الرئيسية</a>
                <a href="#about" class="nav-link">من نحن</a>
                <a href="#contracting" class="nav-link">خدمات المقاولات</a>
                <a href="#cleaning" class="nav-link">التنظيف والدعم</a>
                <a href="#contact" class="nav-link">اتصل بنا</a>
                <a href="index.html" class="nav-link lang-toggle">English <i class="fas fa-globe ml-2"></i></a>
            </div>
            <div class="hamburger">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>

    
