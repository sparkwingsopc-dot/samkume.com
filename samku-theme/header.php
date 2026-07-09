<!DOCTYPE html>
<html lang="en">
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
                <a href="#home" class="nav-link active">Home</a>
                <a href="#about" class="nav-link">About Us</a>
                <a href="#contracting" class="nav-link">Contracting Services</a>
                <a href="#cleaning" class="nav-link">Cleaning & Support</a>
                <a href="#contact" class="nav-link">Contact Us</a>
                <a href="index-ar.html" class="nav-link lang-toggle">عربي <i class="fas fa-globe ml-2"></i></a>
            </div>
            <div class="hamburger">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>

    
