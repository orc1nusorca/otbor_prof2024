<?php
function my_custom_theme_setup() {
    // Добавляем поддержку пользовательских настроек
    add_theme_support('custom-background');
    
    // Регистрация кастомайзера
    add_action('customize_register', 'my_custom_theme_customize_register');
}
add_action('after_setup_theme', 'my_custom_theme_setup');

function my_custom_theme_customize_register($wp_customize) {
    // Настройка цвета фона
    $wp_customize->add_section('my_custom_theme_colors', array(
        'title' => __('Цвета', 'my-custom-theme'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('background_color', array(
        'default' => '#ffffff',
        'sanitize_callback' => 'sanitize_hex_color',
    ));

    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'background_color', array(
        'label' => __('Цвет фона', 'my-custom-theme'),
        'section' => 'my_custom_theme_colors',
        'settings' => 'background_color',
    )));

    // Настройка авторских прав
    $wp_customize->add_setting('copyright_text', array(
        'default' => __('© 2023 Ваше Имя. Все права защищены.', 'my-custom-theme'),
    ));

    $wp_customize->add_control('copyright_text', array(
        'label' => __('Авторские права', 'my-custom-theme'),
        'section' => 'my_custom_theme_colors',
        'type' => 'text',
    ));

    // Настройка ссылок на социальные сети
    $wp_customize->add_setting('social_links', array(
        'default' => '',
    ));

    $wp_customize->add_control('social_links', array(
        'label' => __('Ссылки на социальные сети (через запятую)', 'my-custom-theme'),
        'section' => 'my_custom_theme_colors',
        'type' => 'text',
    ));
}

function my_custom_theme_customizer_css() {
    ?>
    <style type="text/css">
        body {
            background-color: <?php echo get_theme_mod('background_color', '#ffffff'); ?>;
        }
    </style>
    <?php
}
add_action('wp_head', 'my_custom_theme_customizer_css');
