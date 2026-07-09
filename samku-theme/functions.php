<?php
/**
 * Samku Theme functions and definitions
 */

if ( ! function_exists( 'samku_theme_setup' ) ) :
	function samku_theme_setup() {
		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails on posts and pages.
		add_theme_support( 'post-thumbnails' );

		// Register navigation menus.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Primary', 'samku-theme' ),
		) );
	}
endif;
add_action( 'after_setup_theme', 'samku_theme_setup' );

/**
 * Enqueue scripts and styles.
 */
function samku_theme_scripts() {
    // Fonts
    wp_enqueue_style( 'samku-google-fonts', 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Inter:wght@300;400;500;600;700&display=swap', array(), null );
    
    // Font Awesome
    wp_enqueue_style( 'samku-font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0' );

    // Main CSS
	wp_enqueue_style( 'samku-theme-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );

    // Main JS
	wp_enqueue_script( 'samku-theme-script', get_template_directory_uri() . '/assets/script.js', array(), wp_get_theme()->get( 'Version' ), true );
}
add_action( 'wp_enqueue_scripts', 'samku_theme_scripts' );
