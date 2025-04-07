<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div class="container">
    <h1><?php bloginfo('name'); ?></h1>
    
    <footer>
        <p><?php echo get_theme_mod('copyright_text', __('© 2023 Ваше Имя. Все права защищены.', 'my-custom-theme')); ?></p>
        
        <?php 
        $social_links = explode(',', get_theme_mod('social_links', ''));
        if (!empty($social_links)) {
            echo '<ul class="social-links">';
            foreach ($social_links as $link) {
                echo '<li><a href="' . esc_url(trim($link)) . '">' . esc_html(trim($link)) . '</a></li>';
            }
            echo '</ul>';
        }
        ?>
    </footer>
</div>

<?php wp_footer(); ?>
</body>
</html>
